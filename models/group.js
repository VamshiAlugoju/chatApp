const mongoose = require("mongoose");
const schema = mongoose.Schema;

const groupSchema = new schema({
  creator: String,
  Admins: [],
  Name: String,
  createDate: Date,
});

const groupModel = mongoose.model("group", groupSchema);
module.exports = groupModel;
