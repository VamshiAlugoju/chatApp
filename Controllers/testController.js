const groupControllers = require("./groupControllers");
const userControllers = require("./userControllers");
const upload_to_s3 = require("../utils/uploadToS3");
async function test(req, res) {

  console.log("files" , req.file)
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
  // res.send(req.file)
  const file = req.file;
  const filename = Date.now() +"_"+ file.originalname;
  const responseData = await upload_to_s3(filename , file.buffer);
  console.log(responseData , "response Data");
  res.send(responseData);

}
exports.test = test;
