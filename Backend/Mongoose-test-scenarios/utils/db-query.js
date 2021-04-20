const { db, User, Club, Comment } = require('../app');

User.find({}, function (err, users) {
  if (err) return console.error(err);
  console.log(users, '---find');
});

Club.find({}, function (err, clubs) {
  if (err) return console.error(err);
  console.log(clubs, '---find');
});

Comment.find({}, function (err, comments) {
  if (err) return console.error(err);
  console.log(comments, '---find');
});
