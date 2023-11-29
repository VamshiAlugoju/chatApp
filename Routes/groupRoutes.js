const express = require("express");
const Router = express.Router();
const groupControllers = require("../Controllers/groupControllers");
const autherize = require("../utils/autherize");

Router.route("/createGroup").post(autherize, groupControllers.createGroup);
// Router.route("/createGroup").post

module.exports = Router;
