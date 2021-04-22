const { User } = require("../database/db-connection");

exports.fetchUsers = () => {
  return User.find({}, (err, users) => {
    if (err) return console.log(err);
    return users;
  });
};

exports.fetchUserById = (user_id) => {
  return User.findById(user_id, (err, user) => {
    if (err) return console.log(err);
    return user;
  });
};

exports.amendUserById = (user_id, blurbleInc) => {
  return User.findById(user_id, (err, doc) => {
    doc.blurbles = doc.blurbles + blurbleInc;
  });
};
