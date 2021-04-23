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
      badge: Array,
      avatar: String,
      clubs: [{ club_Id: String, progress: Number }],
      _id: Number
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
      badge: Array,
      avatar: String,
      clubs: [{ club_Id: String, progress: Number }]
    },
    { timestamps: { createdAt: "created_at" } }
  )
};

module.exports = UserSchema[ENV];
