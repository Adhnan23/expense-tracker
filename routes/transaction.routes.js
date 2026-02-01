const express = require("express");

const {
  getTransactionsValidator,
  createTransactionValidator,
  updateTransactionValidator,
  deleteTransactionValidator,
  calculateSumByUserValidator,
  calculateSumByYearValidator,
  calculateSumByMonthValidator,
} = require("../middlewares/validators/transactionValidator");

const {
  getAllTransactionsByUser,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  calculateSumByUser,
  calculateSumByYear,
  calculateSumByMonth,
} = require("../controllers/transaction.controller");

const { userAuth } = require("../middlewares/auth");

const transactionsRouter = express.Router();

/* ----------------------------- CRUD ROUTES ----------------------------- */

transactionsRouter.get(
  "/",
  userAuth,
  getTransactionsValidator,
  getAllTransactionsByUser,
);

transactionsRouter.post(
  "/",
  userAuth,
  createTransactionValidator,
  createTransaction,
);

transactionsRouter.put(
  "/:id",
  userAuth,
  updateTransactionValidator,
  updateTransaction,
);

transactionsRouter.delete(
  "/:id",
  userAuth,
  deleteTransactionValidator,
  deleteTransaction,
);

/* -------------------------- AGGREGATION ROUTES -------------------------- */

transactionsRouter.get(
  "/summary",
  userAuth,
  calculateSumByUserValidator,
  calculateSumByUser,
);

transactionsRouter.get(
  "/summary/:year",
  userAuth,
  calculateSumByYearValidator,
  calculateSumByYear,
);

transactionsRouter.get(
  "/summary/:year/:month",
  userAuth,
  calculateSumByMonthValidator,
  calculateSumByMonth,
);

module.exports = transactionsRouter;
