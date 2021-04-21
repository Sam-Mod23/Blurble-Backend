const { User } = require('../database/db-connection');

exports.fetchUserById = (user_id) => {
  return User.findById(user_id, (err, user) => {
    if (err) return console.log(err);
    return user;
  });
};
