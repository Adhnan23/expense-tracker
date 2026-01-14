const { body, param, query } = require("express-validator");
const validate = require("./validator");
const getCategoriesValidator = [
  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be either 'income' or 'expense'"),
  validate(),
];

const createCategoryValidator = [
  body("name").notEmpty().withMessage("Category name is required"),
  body("type")
    .notEmpty()
    .withMessage("Category type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be either 'income' or 'expense'"),
  validate(),
];

const updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category ID"),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Category name cannot be empty"),
  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be either 'income' or 'expense'"),
  validate(),
];

const deleteCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category ID"),
  validate(),
];

module.exports = {
  getCategoriesValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
