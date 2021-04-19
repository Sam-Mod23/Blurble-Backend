const mongoose = require('mongoose');
const seedDb = require('./seed');
// const UserSchema = require('./schema/users-schema');
// const ClubSchema = require('./schema/clubs-schema');

mongoose.connect('mongodb://localhost:27017/blurble', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// const User = mongoose.model('User', UserSchema);
// const Club = mongoose.model('Club', ClubSchema);

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  db.dropDatabase()
    .then((err) => {
      if (err) console.log(err);
      console.log('Database dropped');
    })
    .then(() => {
      seedDb();
    });
  // .then(() => {
  //   mongoose.connection.db.listCollections().toArray((err, data) => {
  //     console.log(err, data, 'in collection list');
  //   });
  // });

  //   User.find(function (err, user) {
  //     if (err) return console.error(err);
  //     console.log(user);
  //   });
});

mongoose.set('useCreateIndex', true);

module.exports = db;
