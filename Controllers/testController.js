const groupControllers = require("./groupControllers");
const userControllers = require("./userControllers");
function test(req, res) {
  req.user = {
    name: "vamshi",
    id: "65620d8005f2179a0e4af6a9",
  };
  const data = {
    gName: "vamshi",
    about: "something",
  };
  req.body = data;
  req.params = {
    id: "6571efb51f6bc78127ceb076",
  };
  try {
    groupControllers.getGroupDetails(req, res);
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
}
exports.test = test;
