const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chatDetailSchema = new schema({
  isGroup: Boolean,
  users: [],
  hasUnread: Boolean,
  groupId: schema.Types.ObjectId,
  gname: String,
  lastMessaged: String,
  latestMessage: String,
});

const chatDetailModel = mongoose.model("chatDetail", chatDetailSchema);
module.exports = chatDetailModel;
