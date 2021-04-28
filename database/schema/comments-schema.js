const mongoose = require("mongoose");
const { Schema } = mongoose;
const ENV = process.env.NODE_ENV || "development";

const CommentSchema = {
  test: new Schema(
    {
      user_id: { type: String, required: true },
      body: { type: String, required: true },
      club_id: { type: String, required: true },
      clubName: { type: String, required: true },
      book: { type: String, required: true },
      progress: { type: Number, required: true },
      // photo: {data: Buffer, contentType: String}
      _id: String,
      votes: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  development: new Schema(
    {
      user_id: { type: String, required: true },

      body: { type: String, required: true },
      club_id: { type: String, required: true },
      clubName: { type: String, required: true },
      book: { type: String, required: true },
      progress: { type: Number, required: true },
      // photo: {data: Buffer, contentType: String}
      _id: String,
      votes: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  production: new Schema(
    {
      user_id: { type: String, required: true },

      body: { type: String, required: true },
      club_id: { type: String, required: true },
      clubName: { type: String, required: true },
      book: { type: String, required: true },
      progress: { type: Number, required: true },
      // photo: {data: Buffer, contentType: String}
      _id: String,
      votes: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: "created_at" } }
  ),
};
module.exports = CommentSchema[ENV];
