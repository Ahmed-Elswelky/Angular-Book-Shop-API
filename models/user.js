const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter your name"] },
  password: { type: String, required: [true, "Please enter password"] },
  email: { type: String, match: /^\w+\@\w+\.\w+/ },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
