const mongoose = require("mongoose");
const { Schema } = mongoose;
const ENV = process.env.NODE_ENV || "development";

const ClubSchema = {
  test: new Schema(
    {
      clubName: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      currentBook: { type: String, required: true },
      nominatedBooks: Array,
      memberIds: { type: Array, required: true },
      adminIds: { type: Array, required: true },
      thumbnail: String,
      comments: Array,
      archivedBooks: Array,
      _id: String
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  development: new Schema(
    {
      clubName: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      currentBook: { type: String, required: true },
      nominatedBooks: Array,
      memberIds: { type: Array, required: true },
      adminIds: { type: Array, required: true },
      thumbnail: String,
      comments: Array,

      archivedBooks: Array,
      _id: String
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  production: new Schema(
    {
      clubName: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      currentBook: { type: String, required: true },
      nominatedBooks: Array,
      memberIds: { type: Array, required: true },
      adminIds: { type: Array, required: true },
      thumbnail: String,
      comments: Array,
      archivedBooks: Array,
      _id: String
    },
    { timestamps: { createdAt: "created_at" } }
  )
};
module.exports = ClubSchema[ENV];
