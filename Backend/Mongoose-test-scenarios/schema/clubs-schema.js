const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClubSchema = new Schema({}, { timestamps: { createdAt: "created_at" } });

module.exports = ClubSchema;
