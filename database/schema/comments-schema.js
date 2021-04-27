const mongoose = require("mongoose");
const { Schema } = mongoose;
const ENV = process.env.NODE_ENV || "development";

const CommentSchema = {
  test: new Schema(
    {
      username: String,

      body: String,
      club_id: String,
      clubName: String,
      book: String,
      progress: Number,
      // photo: {data: Buffer, contentType: String}
      _id: String,
      votes: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  development: new Schema(
    {
      username: String,

      body: String,
      club_id: String,
      clubName: String,
      book: String,
      progress: Number,
      // photo: {data: Buffer, contentType: String}
      _id: String,
      votes: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  production: new Schema(
    {
      username: String,

      body: String,
      club_id: String,
      clubName: String,
      book: String,
      progress: Number,
      // photo: {data: Buffer, contentType: String}
      _id: String,
      votes: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: "created_at" } }
  ),
};
module.exports = CommentSchema[ENV];
