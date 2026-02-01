const ENV = require("./env");
const jwt = require("jsonwebtoken");

const signJwt = (payload) => {
  return jwt.sign(payload, ENV.jwt.secret, { expiresIn: ENV.jwt.expiresIn });
};

const decodeJwt = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ENV.jwt.secret);
    req.user = decoded;
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  signJwt,
  decodeJwt,
};
