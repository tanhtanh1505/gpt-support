let mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
  content: String,
  answer: String,
});

module.exports = mongoose.model("Question", questionSchema);
