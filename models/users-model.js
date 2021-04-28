const { User, mongoose } = require("../database/db-connection");

exports.fetchUsers = () => {
  return User.find({}, (err, users) => {
    if (err) return Promise.reject(err);
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
          if (progress >= 0) {
            club.progress = progress;
          }
          if (hasNominated) {
            hasNominated === "yes"
              ? (club.hasNominated = true)
              : (club.hasNominated = false);
          }
        }
        return club;
      });
    }
    return User.findOneAndUpdate(
      _id ? { _id } : { username },
      { clubs: updatedClubs },
      { new: true }
    ).then((doc) => {
      console.log(doc);
      return doc;
    });
  });
};

exports.removeUserByDetails = ({ _id, username }) => {
  if (_id) searchObject = { _id };
  if (username) searchObject = { username };
  return User.deleteOne(searchObject, (err) => {
    if (err) return err;
    return;
  });
};

exports.addUser = (newUser) => {
  if (!newUser._id) newUser._id = mongoose.Types.ObjectId();
  return User.create(newUser).then((user) => {
    return user;
  });
};
