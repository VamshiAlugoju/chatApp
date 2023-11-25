const jwt = require("jsonwebtoken");

function autherize(req, res, next) {
  const token = req.token;
  const user = jwt.verify(token, "secretkey");
  if (user) {
    req.user = user;
    next();
  }
  res.status(400).json({ status: false, message: "please login again" });
}

module.exports = autherize;
