const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
  flatName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Flat", flatSchema);
