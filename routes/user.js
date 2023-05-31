const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrybt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const userList = await UserModel.find({});
    res.json(userList);
  } catch (error) {
    res.send(error);
  }
});
router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }
    const user = await UserModel.findOne({ _id: claims._id });
    const { password, ...data } = await user.toJSON();
    res.json(data);
  } catch (error) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
});
router.post("/register", async (req, res) => {
  const salt = await bcrybt.genSalt(10);
  const hashedPassword = await bcrybt.hash(req.body.password, salt);
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    const { password, ...data } = await savedUser.toJSON();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.post("/login", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(404).send({
      message: "user not found",
    });
  }
  if (!(await bcrybt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "invalid credentials",
    });
  }
  try {
    console.log(user);
    const token = jwt.sign({ _id: user._id }, "secret");
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, //1 day
    });
    res.json({
      message: "login successful",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("jwt", "", { maxAge: 0 });
  try {
    res.json({
      message: "logout successful",
    });
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
