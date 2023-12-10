const express = require("express");
const Router = express.Router();
const chatControllers = require("../Controllers/chatControllers");
const autherize = require("../utils/autherize");
const multer = require("multer");
const upload = multer();
Router.route("/sendMessage").post( autherize, upload.single("file") ,chatControllers.sendMessage);
Router.route("/getMessages").post(autherize, chatControllers.getMessages);
// Router.route("/createGroup").post

module.exports = Router;
