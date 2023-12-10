const express = require("express");
const multer = require("multer")
const upload = multer();
const Router = express.Router();
const userControllers = require("../Controllers/userControllers");
const autherize = require("../utils/autherize");
Router.route("/signUp").post( upload.single("file") , userControllers.signUp);
Router.route("/signIn").post(  userControllers.signIn);
Router.route("/allUsers").get(autherize, userControllers.getAllUsers);
Router.route("/getUserDetails/").get(autherize, userControllers.getUserDetails);
Router.route("/getUserDetails/:id").get(autherize, userControllers.getUserDetails);

// Router.route("/allUsers").get(userControllers.getAllUsers);

module.exports = Router;

// fiverr
//people
//upwork
