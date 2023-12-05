const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema({
  content: String,
  type: String,
  SStatus: String,
  RStatus: String,
  time: String,
  date: Date,
  sender: {},
  reciever: {},
  belongsToGroup: Boolean,
  groupId: { type: schema.ObjectId },
});

const messageModal = mongoose.model("message", messageSchema);
module.exports = messageModal;
