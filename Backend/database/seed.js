const { db, User, Club, Comment } = require("./app");

const { userData, commentData, clubData } = require("./data/index");

process.env.NODE_ENV = "test";

const seedDb = () => {
  db.dropDatabase().then(() => {
    console.log("db dropped");
    User.insertMany(userData).then((data) => {
      console.log("inserted users");
    });
    Club.insertMany(clubData, (err, data) => {
      if (err) console.log(err);
      console.log("inserted clubs");
    });
    Comment.insertMany(commentData, (err, data) => {
      if (err) console.log(err);
      console.log("inserted comments");
    });
  });
};

seedDb();

module.exports = { User, Club, Comment };
