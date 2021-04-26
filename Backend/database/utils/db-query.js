const { db, User, Club, Comment } = require("../db-connection.js");

User.find({}, function (err, users) {
  if (err) return console.error(err);
  console.log("---users", users);
});

Club.find({}, function (err, clubs) {
  if (err) return console.error(err);
  console.log("---clubs", clubs);
});

Comment.find({}, function (err, comments) {
  if (err) return console.error(err);
  console.log("---comments", comments);
});
