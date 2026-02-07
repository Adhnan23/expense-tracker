const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/hashPassword");
const { signJwt } = require("../utils/jwt");

const register = async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Email already in use" });
  }
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
  User.create(user);
  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const token = signJwt({ id: user.id });
  res.status(200).json({ success: true, message: "Login successful", token });
};

module.exports = { register, login };
