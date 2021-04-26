const mongoose = require("mongoose");
const { Schema } = mongoose;
const ENV = process.env.NODE_ENV || "development";

const CommentSchema = {
  test: new Schema(
    {
      username: String,
      user_id: String,
      body: String,
      group_id: String,
      group_name: String,
      current_book_ISBN: Number,
      progress: Number,
      _id: Number,
      // photo: {data: Buffer, contentType: String}
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  development: new Schema(
    {
      username: String,
      user_id: String,
      body: String,
      group_id: String,
      group_name: String,
      current_book_ISBN: Number,
      progress: Number,
      // photo: {data: Buffer, contentType: String}
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  production: new Schema(
    {
      username: String,
      user_id: String,
      body: String,
      group_id: String,
      group_name: String,
      current_book_ISBN: Number,
      progress: Number,
      // photo: {data: Buffer, contentType: String}
    },
    { timestamps: { createdAt: "created_at" } }
  ),
};
module.exports = CommentSchema[ENV];
