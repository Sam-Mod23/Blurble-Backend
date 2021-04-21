const mongoose = require('mongoose');
const UserSchema = require('./schema/users-schema');
const ClubSchema = require('./schema/clubs-schema');
const CommentSchema = require('./schema/comments-schema');

mongoose.connect('mongodb://localhost:27017/blurble', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to db');
});

mongoose.set('useCreateIndex', true);

const User = mongoose.model('User', UserSchema);
const Club = mongoose.model('Club', ClubSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { db, User, Club, Comment };
