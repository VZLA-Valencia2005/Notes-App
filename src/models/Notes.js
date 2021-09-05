const mongoose = require("mongoose");

const noteSchema = mongoose.Schema;

const Note = new noteSchema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: {type: String}
});

module.exports = mongoose.model("Note", Note);
