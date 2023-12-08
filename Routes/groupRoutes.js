const express = require("express");
const Router = express.Router();
const groupControllers = require("../Controllers/groupControllers");
const autherize = require("../utils/autherize");

Router.route("/createGroup").post(autherize, groupControllers.createGroup);
Router.route("/getAllUsers/:id").get(autherize, groupControllers.getAllUsers);
Router.route("/addToGroup").post(autherize, groupControllers.addToGroup);
Router.route("/getGroupDetails/:id").get(
  autherize,
  groupControllers.getGroupDetails
);
Router.route("/addAdmin").post(autherize, groupControllers.addAdmins);
Router.route("/removeUsers").post(autherize, groupControllers.removeUsers);

// Router.route("/createGroup").post

module.exports = Router;
