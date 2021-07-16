const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  job: {
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

module.exports = mongoose.model("Job", jobSchema);
