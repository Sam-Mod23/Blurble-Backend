const seedFunction = async () => {
  const { db, User, Club, Comment } = require("./db-connection.js");

  const { userData, commentData, clubData } = require("./data/index");

  process.env.NODE_ENV = "test";

  const seedDb = () => {
    return db.dropDatabase().then(() => {
      return Promise.all([
        User.insertMany(userData),
        Club.insertMany(clubData),
        Comment.insertMany(commentData),
      ]);
    });
  };

  return seedDb();
};

module.exports = { seedFunction };
