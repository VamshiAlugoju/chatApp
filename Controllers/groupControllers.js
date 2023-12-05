const groupModel = require("../models/group");
const userModal = require("../models/userModel");
async function createGroup(req, res) {
  try {
    const { gName, about } = req.body;

    if (gName && about) {
      const result = await groupModel.create({
        Admins: [req.user],
        creator: req.user,
        Name: gName,
        createDate: Date.now(),
        members: [req.user],
      });
      const objToUpdate = {
        $push: {
          chatList: {
            _id: result._id,
            gName: result.Name,
            isGroup: true,
          },
        },
      };
      const updateUser = await userModal.updateOne(
        { _id: req.user._id },
        objToUpdate
      );
      return res
        .status(201)
        .json({ status: true, message: "group created", Group: result });
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
}

exports.createGroup = createGroup;
