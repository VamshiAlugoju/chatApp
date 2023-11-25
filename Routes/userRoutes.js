const express = require("express");
const Router = express.Router();
const userControllers = require("../Controllers/userControllers");

Router.route("/signUp").post(userControllers.signUp);
Router.route("/signIn").post(userControllers.signIn);

module.exports = Router;
