const mongoose = require("mongoose");
const schema = mongoose.Schema;

const groupSchema = new schema({
  creator: {},
  Admins: [],
  Name: String,
  createDate: Date,
  members: [],
  About:String
});

const groupModel = mongoose.model("group", groupSchema);
module.exports = groupModel;
