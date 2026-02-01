const { decodeJwt } = require("../utils/jwt");

const userAuth = (req, res, next) => {
  const user = decodeJwt(req);
  if (!user)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  next();
};

const systemAuth = (req, res, next) => {
  if (req.user.role !== "system")
    return res.status(401).json({ success: false, message: "Unauthorized" });
  next();
};

module.exports = { userAuth, systemAuth };
