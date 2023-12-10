const jwt = require("jsonwebtoken");
const userModal = require("../models/userModel")

async function autherize(req, res, next) {
  const token = req.headers.authorization;
  const user = jwt.verify(token, "secretkey");
  if (user) {
    let userDetails = await userModal.find({_id : user.user[0]._id},{name:true,email:true,chatList:true,imgSrc:true,_id:true});
    if(userDetails.length === 0){
      return res.status(400).json({message:"please login again"})
    }
    userDetails[0]= userDetails[0].toObject();
    userDetails[0]._id = userDetails[0]._id.toString();
    req.user = userDetails[0];
    
    return next();
  }
  res.status(400).json({ status: false, message: "please login again" });
}

module.exports = autherize;
