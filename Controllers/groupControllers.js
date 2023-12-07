const groupModel = require("../models/group");
const userModal = require("../models/userModel");
const chatModal = require("../models/chatdetailmodel");

// create group modal
// create a chatmodal
// update the user

async function createGroup(req, res) {
  try {
    const { gName, about } = req.body;

    if (gName && about) {
      //create group
      const result = await groupModel.create({
        Admins: [req.user],
        creator: req.user,
        Name: gName,
        createDate: Date.now(),
        members: [req.user],
      });
      const objUpdate = {
        isGroup: true,
        gname: result.Name,
        groupId: result._id,
        lastMessage: req.user._id,
      };
      // update chat modal
      const chatmodal = await chatModal.create(objUpdate);
      chatmodal.toObject();
      const objToUpdate = {
        $push: {
          chatList: chatmodal,
        },
      };
      // update user
      const updateUser = await userModal.updateOne(
        { _id: req.user._id },
        objToUpdate
      );
      return res
        .status(201)
        .json({ status: true, message: "group created", Group: result });
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
}

exports.createGroup = createGroup;

async function getAllUsers(req, res) {
  try {
    const id = req.params.id;
    const group = await groupModel.find({ _id: id });
    if (group[0] && group[0].members) {
      const filters = group[0].members.map((user) => {
        return user._id;
      });
      const users = await userModal.find(
        { _id: { $nin: filters } },
        { email: true, name: true, _id: true }
      );
      return res.status(200).json({ status: true, data: users });
    } else {
      return res.status(500).json({ message: "No members are present" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

exports.getAllUsers = getAllUsers;

// add to group
// get chat modal
//update the other person
// update the members arr in group
//
async function addToGroup(req, res) {
  try {
    const user = req.user;
    const payload = req.body;

    let chatmodal = await chatModal.find(
      { groupId: payload.groupId },
      { users: false }
    );

    chatmodal = chatmodal[0].toObject();
    const objToUpdate = {
      $push: { chatList: chatmodal },
    };
    let prospect = await userModal
      .findByIdAndUpdate(payload._id, objToUpdate)
      .select("_id name email");

    prospect = prospect.toObject();
    const updateGroup = await groupModel.updateOne(
      { _id: payload.groupId },
      { $push: { members: prospect } }
    );
    return res.status(200).json({ message: "added to Group" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

exports.addToGroup = addToGroup;

// query group from _id;
async function getGroupDetails(req, res) {
  try {
    let groupId = req.params.id;
    groupId = groupId.toString();
    const group = await groupModel.findById(groupId);
    return res.status(200).json({ data: group });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

exports.getGroupDetails = getGroupDetails;
