const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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
  description: {
    type: String,
    require: true,
  },
  prize: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
