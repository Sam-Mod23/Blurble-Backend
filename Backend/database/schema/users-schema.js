const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isOver18: Boolean,
    email: { type: String, required: true, unique: true },
    blurbles: Number,
    badge: Array,
    avatar: String,
    clubs: [{ clubName: String, club_Id: String, progress: Number }]

    //location - possibly
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = UserSchema;
