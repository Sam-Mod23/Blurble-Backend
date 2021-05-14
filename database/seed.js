const seedFunction = () => {
  const { User, Club, Comment } = require("./db-connection.js");

  const { userData, commentData, clubData } = require("./data/index");

  const seedDb = () => {
    return Promise.all([
      User.collection.deleteMany({}),
      Comment.collection.deleteMany({}),
      Club.collection.deleteMany({})
    ])
      .then(() => {
        return Promise.all([User.init(), Comment.init(), Club.init()]);
      })
      .then(() => {
        return Promise.all([
          User.insertMany(userData),
          Club.insertMany(clubData),
          Comment.insertMany(commentData)
        ]);
      });
  };

  return seedDb();
};

module.exports = { seedFunction };
