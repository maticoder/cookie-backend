const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  value: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
