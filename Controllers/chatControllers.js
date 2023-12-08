const { response } = require("express");
const chatModal = require("../models/chatdetailmodel");
const messageModal = require("../models/messageModel");
const userModal = require("../models/userModel");

async function sendMessage(req, res) {
  const user = req.user;
  const chatList = user.chatList;
  const payload = req.body;
  if (payload && payload.rec.isGroup === true) {
    return sendMessageToGroup(user, chatList, payload)
      .then((response) => {
        return res.status(200).json({ status: true, data: response });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  }
  let messageData = {
    content: payload.message,
    type: "text",
    time: payload.time,
    date: new Date().toString(),
    sender: { ...user },
    belongsToGroup: false,
  };
  const chat = user?.chatList?.find((chat) => {
    return chat?.users?.some((user) => {
      return user._id === payload.rec._id;
    });
  });

  try {
    let reciever = await userModal.findById(payload.rec._id);
    reciever = reciever.toObject();
    reciever._id = reciever._id.toString();
    messageData.reciever = { ...reciever };
    if (chat) {
      const updateChat = await chatModal.updateOne(
        { _id: chat.id },
        { lastMessaged: user.name, latestMessage: payload.message }
      );
      const message = await messageModal.create(messageData);

      res
        .status(200)
        .json({ status: true, message: "message sent", data: message });
    } else {
      const chatData = {
        isGroup: false,
        users: [user, reciever],
        lastMessaged: user.name,
        latestMessage: payload.message,
      };
      const chat = await chatModal.create(chatData);
      const chatObject = chat.toObject();
      // add it to current user and reciever
      const updateReciever = await userModal.updateOne(
        { _id: payload.rec._id },
        {
          $push: {
            chatList: {
              isGroup: chatObject.isGroup,
              users: chatObject.users,
              _id: chatObject._id,
            },
          },
        }
      );
      const updateUser = await userModal.updateOne(
        { _id: user._id },
        {
          $push: {
            chatList: {
              isGroup: chatObject.isGroup,
              users: chatObject.users,
              _id: chatObject._id,
            },
          },
        }
      );
      const message = await messageModal.create(messageData);

      res
        .status(200)
        .json({ status: true, message: "message sent", data: message });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "couldn't send message", error: err });
  }
}

exports.sendMessage = sendMessage;

async function getMessages(req, res) {
  try {
    const user = req.user;
    const payload = req.body;
    if (payload.isGroup === true) {
      const groupMessage = await getGroupMessages(user, payload);
      return res.status(200).json({ status: true, data: groupMessage });
    }
    const messageData = await messageModal
      .find({
        $or: [
          { "sender._id": user._id, "reciever._id": payload.recId },
          { "sender._id": payload.recId, "reciever._id": user._id },
        ],
      })
      .sort({ date: 1 });
    return res.status(200).json({ status: true, data: messageData });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "couldn't send message", error: err });
  }
}

exports.getMessages = getMessages;

async function sendMessageToGroup(user, chatList, payload) {
  let messageData = {
    content: payload.message,
    type: "text",
    time: payload.time,
    date: new Date().toString(),
    sender: { ...user },
    belongsToGroup: true,
    groupId: payload.rec._id,
  };

  const chat = user?.chatList?.find((chat) => {
    return chat._id === payload.rec._id;
  });
  try {
    if (chat) {
      const updateChat = await chatModal.updateOne(
        { _id: chat.id },
        { lastMessaged: user.name, latestMessage: payload.message }
      );
      const message = await messageModal.create(messageData);
      return Promise.resolve(message);
    } else {
      const chatData = {
        isGroup: true,
        groupId: payload.rec._id,
        gname: payload.rec.name,
        lastMessaged: user.name,
        latestMessage: payload.message,
      };
      const chat = await chatModal.create(chatData);
      const chatObject = chat.toObject();

      const message = await messageModal.create(messageData);

      return Promise.resolve(message);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getGroupMessages(user, payload) {
  const messages = await messageModal
    .find({ groupId: payload.recId, belongsToGroup: true })
    .sort({ date: 1 });
  return Promise.resolve(messages);
  return Promise.resolve(messages);
}

let counter = 0;

function chatSocket(io){
   
  // io.on("connection",()=>{
  //   console.log("socket connected");
  //   console.log(counter);
  //   counter ++;
  // })
}

exports.chatSSocket = chatSocket;