const { Club, mongoose } = require("../database/db-connection");

exports.fetchClubs = () => {
  return Club.find({}, (err, clubs) => {
    if (err) return console.log(err);
    return clubs;
  });
};

exports.fetchClub = ({ _id, clubName }) => {
  let searchObject = {};
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };
  return Club.find(searchObject).then((club) => {
    if (!Object.keys(club).length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return club[0];
    }
  });
};

exports.addClub = (newClub) => {
  if (!newClub._id) newClub._id = mongoose.Types.ObjectId();
  return Club.create(newClub).then((postedClub) => {
    return postedClub;
  });
};

exports.removeClub = ({ _id, clubName }) => {
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };
  return Club.deleteOne(searchObject, (err) => {
    if (err) return Promise.reject(err);
    return;
  });
};

exports.amendClub = ({ _id, clubName }, { currentBook }) => {
  let searchObject;
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { username };
  let updateObj;
  if (currentBook) updateObj = { currentBook };
  return Club.findOneAndUpdate(searchObject, updateObj, { new: true }).then(
    (doc) => {
      return doc;
    }
  );
};
