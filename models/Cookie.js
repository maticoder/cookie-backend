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
});

module.exports = mongoose.model("Cookie", cookieSchema);
