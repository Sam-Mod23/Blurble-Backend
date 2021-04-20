const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    username: String,
    user_id: String,
    body: String,
    group_id: String,
    group_name: String,
    current_book_ISBN: Number,
    progress: Number
    // photo: {data: Buffer, contentType: String}
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = CommentSchema;
