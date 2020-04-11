const { Types, Schema, model } = require("mongoose");

const schema = new Schema({
  from: { type: String, required: true }, // Исходная ссылка
  to: { type: String, required: true, unique: true }, // Короткая ссылка
  code: { type: String, required: true, unique: true }, // Короткий ID который идет после домена example: eyEM9
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Link", schema);
