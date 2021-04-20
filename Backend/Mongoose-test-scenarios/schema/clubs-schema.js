const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClubSchema = new Schema(
  {
    clubName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    currentBook: { type: Object, required: true },
    nominatedBooks: Array,
    memberIds: { type: Array, required: true },
    adminIds: { type: Array, required: true },
    thumbnail: String,
    comments: Array,
    archivedBooks: Array
    //location - possibly
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = ClubSchema;
