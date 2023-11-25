const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  imgSrc: String,
  createdDate: { type: Date },
  profileDone: { type: Boolean, default: false },
});

const userModel = mongoose.model("userDetails", userSchema);
module.exports = userModel;
