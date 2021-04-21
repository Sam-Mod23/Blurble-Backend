const { db, User, Club, Comment } = require('../app');

User.find({}, function (err, users) {
  if (err) return console.error(err);
  console.log(users, '---users');
});

Club.find({}, function (err, clubs) {
  if (err) return console.error(err);
  console.log(clubs, '---clubs');
});

Comment.find({}, function (err, comments) {
  if (err) return console.error(err);
  console.log(comments, '---comments');
});
