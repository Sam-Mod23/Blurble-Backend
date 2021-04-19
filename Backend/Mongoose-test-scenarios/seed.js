const mongoose = require('mongoose');
const db = require('./app');
const UserSchema = require('./schema/users-schema');
const ClubSchema = require('./schema/clubs-schema');
const { userData, commentData, clubData } = require('./data/index');

process.env.NODE_ENV = 'test';

const User = mongoose.model('User', UserSchema);
const Club = mongoose.model('Club', ClubSchema);

const seedDb = () => {
  User.insertMany(userData, (err, data) => {
    console.log(err, data);
  });

  Club.insertMany(clubData, (err, data) => {
    console.log(err, data);
  });

  //   mongoose.connection.db.listCollections().toArray((err, data) => {
  //     console.log(data);
  //   });
};

module.exports = seedDb;
