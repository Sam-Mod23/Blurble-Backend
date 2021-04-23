const mongoose = require("mongoose");
const { Schema } = mongoose;
const ENV = process.env.NODE_ENV || "development";

const UserSchema = {
  test: new Schema(
    {
      username: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      isOver18: Boolean,
      email: { type: String, required: true, unique: true },
      blurbles: { type: Number, default: 0 },
      badges: Array,
      avatar: String,
      clubs: {
        type: Array,
        default: [{ club_id: 0, progress: 0, hasNominated: false }],
      },
      _id: Number,
    },
    { timestamps: { createdAt: "created_at" } }
  ),
  development: new Schema(
    {
      username: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      isOver18: Boolean,
      email: { type: String, required: true, unique: true },
      blurbles: { type: Number, default: 0 },
      badges: Array,
      avatar: String,
      clubs: {
        type: Array,
        default: [{ club_id: 0, progress: 0, hasNominated: false }],
      },
    },
    { timestamps: { createdAt: "created_at" } }
  ),
};

module.exports = UserSchema[ENV];
