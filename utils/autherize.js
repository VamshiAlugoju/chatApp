const jwt = require("jsonwebtoken");

function autherize(req, res, next) {
  const token = req.headers.authorization;
  const user = jwt.verify(token, "secretkey");
  if (user) {
    req.user = user.user[0];
    return next();
  }
  res.status(400).json({ status: false, message: "please login again" });
}

module.exports = autherize;
