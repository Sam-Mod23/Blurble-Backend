const mongoose = require('mongoose');
const UserSchema = require('./schema/users-schema');
// const autoIncrement = require('mongoose-auto-increment');

const MongoClient = require('mongodb').MongoClient;

mongoose.connect('mongodb://localhost:27017/blurble', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected');
  User.insertMany(
    [
      { username: 'user9', isOver18: true, email: 'email9' },
      { username: 'user10', isOver18: false, email: 'email10' }
    ],
    (err, data) => {
      console.log(data);
    }
  );
});

// UserSchema.plugin(autoIncrement.plugin, 'User');
const User = mongoose.model('User', UserSchema);

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
