const { request } = require("express");

const seedFunction = async () => {
  const { db, User, Club, Comment } = require("./db-connection.js");

  const { userData, commentData, clubData } = require("./data/index");
  console.log(process.env.NODE_ENV);
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

    //   return db.dropDatabase().then(() => {
    //     return Promise.all([
    //       User.insertMany(userData),
    //       Club.insertMany(clubData),
    //       Comment.insertMany(commentData),
    //     ]);
    //   });
  };

  return seedDb();
};

seedFunction();

module.exports = { seedFunction };
