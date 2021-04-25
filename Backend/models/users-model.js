const { User } = require("../database/db-connection");
const usersRouter = require("../routers/usersRouter");

exports.fetchUsers = () => {
  return User.find({}, (err, users) => {
    if (err) return console.log(err);
    return users;
  });
};

exports.fetchUser = ({ _id, username }) => {
  let searchObject = {};
  if (_id) searchObject = { _id };
  if (username) searchObject = { username };

  return User.find(searchObject).then((user) => {
    if (!Object.keys(user).length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return user[0];
    }
  });
};

exports.amendUserByDetails = (
  { _id, username },
  { blurblesInc, club_id, newBadge }
) => {
  if (_id) searchObject = { _id };
  if (username) searchObject = { username };

  let updateObj;
  if (blurblesInc) updateObj = { $inc: { blurbles: blurblesInc } };
  if (club_id) {
    updateObj = {
      $push: { clubs: { club_id, progress: 0, hasNominated: false } }
    };
  }
  if (newBadge) updateObj = { $push: { badges: newBadge } };

  return User.findOneAndUpdate(searchObject, updateObj, { new: true }).then(
    (doc) => {
      return doc;
    }
  );
};

exports.amendUserClubsByDetails = (
  { _id, username },
  { club_id, progress, hasNominated, clubToRemove }
) => {
  if (_id) searchObject = { _id };
  if (username) searchObject = { username };

  return this.fetchUser(searchObject).then((userInfo) => {
    let updatedClubs;
    if (clubToRemove) {
      updatedClubs = userInfo.clubs.filter((club) => {
        return club.club_id !== clubToRemove;
      });
    } else {
      updatedClubs = userInfo.clubs.map((club) => {
        if (club_id === club.club_id) {
          if (progress) club.progress = progress;
          if (hasNominated) club.hasNominated = hasNominated;
        }
        return club;
      });
    }
    return User.findOneAndUpdate(
      searchObject,
      { clubs: updatedClubs },
      { new: true }
    ).then((doc) => {
      return doc;
    });
  });
};

exports.removeUserByDetails = ({ _id, username }) => {
  if (_id) searchObject = { _id };
  if (username) searchObject = { username };
  return User.deleteOne(searchObject, (err) => {
    return;
  });
};

exports.addUser = (newUser) => {
  return User.create(newUser).then((user) => {
    return user;
  });
};
