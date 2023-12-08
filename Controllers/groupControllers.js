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

// just push the user to the Admins array
async function addAdmins(req, res) {
  try {
    const payload = req.body;
    const user = req.user;
    let userprm = await userModal.findById(payload._id, {
      _id: true,
      name: true,
      email: true,
    });
    userprm = userprm.toObject();
    const groupprm = await groupModel.updateOne(
      { _id: payload.groupId },
      userprm
    );
    return res.status(200).json({ status: true, message: "added to group" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

exports.addAdmins = addAdmins;

// check the user is admin or not;
// if admin then remove the user from the members array and if he exists in admin remove from there also;
async function removeUsers(req, res) {
  try {
    const payload = req.body;
    const user = req.user;
    const group = await groupModel.find({ _id: payload.groupId });
    const isUserAdmin =
      group.Admins.find((item) => {
        return item._id === user._id;
      }).length !== 0;
    if (!isAdmin) {
      return res
        .status(204)
        .json({ status: false, message: "you are not a admin" });
    }

    const updateprm = await groupModel.updateOne(
      { _id: payload.groupId },
      {
        $pull: { members: { _id: payload._id }, Admins: { _id: payload._id } },
      }
    );
    return res.status(200).json({ message: "removed successfulluy" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

exports.removeUsers = removeUsers;
