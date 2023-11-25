// const { sign } = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ user }, "secretkey");
  return token;
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "invlaid data check the form once **",
    });
  }

  const user = await userModel.find({ email });
  if (user && user[0]) {
    return res
      .status(409)
      .json({ status: false, message: "user already exists" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return err;
    }
    userModel.create({
      name,
      email,
      password: hash,
      createdDate: Date.now(),
    });
    res.json({
      name,
      email,
      status: true,
      message: "Account Created",
    });
  });
};
exports.signUp = signUp;

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await userModel.find({ email });
  if (user && user[0].email === email) {
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
    res.status(404).json(new Error("user not found"));
  }
}
exports.signIn = signIn;
