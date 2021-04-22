const { User } = require("../database/db-connection");

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
      return user;
    }
  });
};

exports.amendUserById = (user_id, blurbleInc) => {
  return User.findById(user_id, (err, doc) => {
    doc.blurbles = doc.blurbles + blurbleInc;
  });
};
