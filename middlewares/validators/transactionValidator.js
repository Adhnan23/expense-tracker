const { body, param, query } = require("express-validator");
const validate = require("./validator");

/* ------------------------- COMMON QUERY VALIDATORS ------------------------- */

const typeQueryValidator = query("type")
  .optional()
  .isIn(["income", "expense"])
  .withMessage("Type must be either 'income' or 'expense'");

const categoryQueryValidator = query("category")
  .optional()
  .isMongoId()
  .withMessage("Invalid category ID");

/* ----------------------------- CRUD VALIDATORS ----------------------------- */

const getTransactionsValidator = [typeQueryValidator, validate()];

const createTransactionValidator = [
  body("type")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be either 'income' or 'expense'"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO date"),

  validate(),
];

const updateTransactionValidator = [
  param("id").isMongoId().withMessage("Invalid transaction ID"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be either 'income' or 'expense'"),

  body("amount").optional().isNumeric().withMessage("Amount must be a number"),

  body("category").optional().isMongoId().withMessage("Invalid category ID"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO date"),

  validate(),
];

const deleteTransactionValidator = [
  param("id").isMongoId().withMessage("Invalid transaction ID"),
  validate(),
];

/* -------------------------- AGGREGATION VALIDATORS -------------------------- */

const calculateSumByUserValidator = [
  typeQueryValidator,
  categoryQueryValidator,
  validate(),
];

const calculateSumByYearValidator = [
  param("year").isInt({ min: 1970 }).withMessage("Year must be a valid number"),

  typeQueryValidator,
  categoryQueryValidator,
  validate(),
];

const calculateSumByMonthValidator = [
  param("year").isInt({ min: 1970 }).withMessage("Year must be a valid number"),

  param("month")
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 and 12"),

  typeQueryValidator,
  categoryQueryValidator,
  validate(),
];

module.exports = {
  getTransactionsValidator,
  createTransactionValidator,
  updateTransactionValidator,
  deleteTransactionValidator,
  calculateSumByUserValidator,
  calculateSumByYearValidator,
  calculateSumByMonthValidator,
};
