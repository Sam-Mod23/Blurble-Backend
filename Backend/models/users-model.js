const { User } = require('../database/db-connection');

exports.fetchUserById = (user_id) => {
  return User.find({}, (err, user) => {
    if (err) return console.log(err);
    return user;
  });
};

exports.amendUserById = (user_id, blurbleInc) => {
  return User.findById(user_id, (err, doc) => {
    doc.blurbles = doc.blurbles + blurbleInc;
  });
};
