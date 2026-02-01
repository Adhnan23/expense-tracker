const ENV = require("./env");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const saltedPassword = password + ENV.bcrypt.secret;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(saltedPassword, salt);
  return hashed;
};

const verifyPassword = (password, hashedPassword) => {
  const saltedPassword = password + ENV.bcrypt.secret;
  return bcrypt.compare(saltedPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  verifyPassword,
};
