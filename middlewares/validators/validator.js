const { validationResult } = require("express-validator");
const validate = () => (req, res, next) => {
  validationResult(req).throw();
  next();
};

module.exports = validate;
