const { db, User, Club, Comment } = require('./app');

const { userData, commentData, clubData } = require('./data/index');

process.env.NODE_ENV = 'test';

const seedDb = () => {
  db.dropDatabase().then(() => {
    User.insertMany(userData).then((data) => {
      console.log('insert many');
    });
    Club.insertMany(clubData, (err, data) => {
      if (err) console.log(err);
      console.log('insert many');
    });
    Comment.insertMany(commentData, (err, data) => {
      if (err) console.log(err);
      console.log('insert many');
    });
  });
  // .then(() => {
  //   User.find({}, function (err, users) {
  //     if (err) return console.error(err);
  //     console.log(users, '---find');
  //   });
  //   Club.find({}, function (err, clubs) {
  //     if (err) return console.error(err);
  //     console.log(clubs, '---find');
  //   });
  //   Comment.find({}, function (err, comments) {
  //     if (err) return console.error(err);
  //     console.log(comments, '---find');
  //   });
  // });
};

seedDb();

module.exports = { User, Club, Comment };
