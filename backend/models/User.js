const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  dateOfBirth: { type: String, required: false },
  mobile: { type: Number, required: false },
  status: { type: Boolean, required: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
