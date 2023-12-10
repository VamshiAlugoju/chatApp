// const { sign } = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload_to_s3 = require("../utils/uploadToS3")

const generateToken = (user) => {
  const token = jwt.sign({ user }, "secretkey");
  return token;
};

const signUp = async (req, res) => {

  try{
    const { name, email, password } = req.body;
    const file = req.file
    
    
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "invlaid data check the form once **",
      });
    }
    let fileDetails;
    if(file )
    {
      if( !file.mimetype?.startsWith("image")){
        return res.status(400).json({message:"not a image"})
      }
      let fileName = Date.now()+"/"+file.originalname;
      fileDetails = await upload_to_s3(fileName , file.buffer);
    }
  
    const user = await userModel.find({ email });
    if (user && user[0]) {
      return res
        .status(409)
        .json({ status: false, message: "user already exists" });
    }
  
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
         throw new Error("internal error" , err);
      }
      await  userModel.create({
        name,
        email,
        password: hash,
        createdDate: Date.now(),
        imgSrc : fileDetails.Location
      });
      return  res.json({
        name,
        email,
        status: true,
        message: "Account Created",
      });
    });
  }
  catch(err){
    return res.status(500).json({error:err})
  }
 
};
exports.signUp = signUp;

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await userModel.find({ email });
  if (user && user[0] && user[0].email === email) {
    bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
        return res.status(500).json({ message: "internal server error" });
      }
      const token = generateToken(user);
      if (result) {
        res.status(200).json({ status: true, message: "loggedIn", token });
      } else {
        res.status(400).json({ status: false, message: "wrong" });
      }
    });
  } else {
    res.status(404).json({ status: false, message: "user not found" });
  }
}
exports.signIn = signIn;

async function getAllUsers(req, res) {
  const user = req.user;
  try {
    if (req.user && req.user.email) {
      const usersToignore = [user.email];
      user.chatList.forEach(item => {
          if(!item.isGroup){
            const otherUser = item.users.find((user)=>user._id !== req.user._id)
            usersToignore.push(otherUser.email)
          }
      });
      const userList = await userModel.find({
        email: { $nin: usersToignore},
      });
      return res.json({ status: true, data: userList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
}
exports.getAllUsers = getAllUsers;

async function getUserDetails(req, res) {
  const user = req.user;
  try {
    let id = req.params.id;
    if (!id) {
      id = user._id;
    }
    const userDetails = await userModel
      .findById(id, "name profileDone email imgSrc")
      .populate("chatList");
    res.status(200).json({ status: true, data: userDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false });
  }
}

exports.getUserDetails = getUserDetails;
