const mongoose = require("mongoose");
const chatDetail = require("./chatdetailmodel");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  imgSrc: String,
  createdDate: { type: Date },
  profileDone: { type: Boolean, default: false },
  chatList: [],
});

const userModel = mongoose.model("userDetails", userSchema);
module.exports = userModel;
