const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  skills: {
    type: [String],
    default: [],
  },
  score: {
    type: Number,
    default: 0,
  },
  suggestions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);