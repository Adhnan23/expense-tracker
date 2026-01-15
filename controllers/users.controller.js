const User = require("../models/User");
const {hashPassword} = require("../utils/hashPassword");

const register = async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Email already in use" });
  }
  const hashedPassword = await hashPassword(user.password);
};
