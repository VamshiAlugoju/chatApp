const express = require("express");
const Router = express.Router();
const userControllers = require("../Controllers/userControllers");
const autherize = require("../utils/autherize");
console.log("function is lf", autherize);
Router.route("/signUp").post(userControllers.signUp);
Router.route("/signIn").post(userControllers.signIn);
// Router.route("/allUsers").get(autherize, userControllers.getAllUsers);
Router.route("/allUsers").get(userControllers.getAllUsers);

module.exports = Router;

// fiverr
//people
//upwork
