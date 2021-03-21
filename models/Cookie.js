const mongoose = require("mongoose");

const cookieSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
    unique: true,
  },
  counter: {
    type: Number,
    require: true,
    unique: false,
    default: 0,
  },
  achievements: {
    type: Array,
    default: [],
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    require: true,
  },
});

module.exports = mongoose.model("Cookie", cookieSchema);
