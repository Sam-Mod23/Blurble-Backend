const mongoose = require("mongoose");
const UserSchema = require("./schema/users-schema");
const ClubSchema = require("./schema/clubs-schema");

mongoose.connect("mongodb://localhost:27017/blurble", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const User = mongoose.model("User", UserSchema);
const Club = mongoose.model("Club", ClubSchema);

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  mongoose.connection.db.listCollections().toArray((err, data) => {
    console.log(data);
  });

  User.find(function (err, user) {
    if (err) return console.error(err);
    console.log(user);
  });
});

User.insertMany(
  [{ username: "user1", name: "Sam", isOver18: false, email: "email1" }],
  (err, data) => {
    console.log(err);
  }
);
Club.insertMany(
  [
    {
      clubName: "Blurble Club",
      description: "test",
      currentBook: { book: "test" },
      memberIds: [1],
      adminIds: [1],
    },
  ],
  (err, data) => {}
);

mongoose.set("useCreateIndex", true);

module.exports = db;
