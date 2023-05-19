const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
router.get("/", async (req, res) => {
  try {
    const userList = await UserModel.find({});
    res.json(userList);
  } catch (error) {
    res.send(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.find({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.send("DataBase Error");
  }
});
router.post("/", async (req, res) => {
  const user = new UserModel(req.body);
  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.send("DataBase Error");
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.json(deletedUser);
  } catch (error) {
    res.send("DataBase Error");
  }
});

module.exports = router;
