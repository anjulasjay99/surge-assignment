const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: String, required: true },
});

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
