const groupModel = require("../models/group");

async function createGroup(req, res) {
  try {
    const { gName, about } = req.body;
    if (gName && about) {
      const result = await groupModel.create({
        Admins: [req.user],
        creator: req.user,
        Name: gName,
        createDate: Date.now(),
      });
      return res.status(201).json({ status: true, message: "group created" });
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
}

exports.createGroup = createGroup;
