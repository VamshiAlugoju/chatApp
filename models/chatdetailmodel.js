const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chatDetailSchema = new schema({
  isGroup: Boolean,
  SName: String,
  RName: String,
  hasUnread: Boolean,
  groupId: schema.ObjectId,
});

const chatDetailModel = mongoose.model("chatDetail", chatDetailSchema);
module.exports = chatDetailModel;
