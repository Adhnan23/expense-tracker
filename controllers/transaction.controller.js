const Category = require("../models/Category");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

/* -------------------------------- HELPERS -------------------------------- */

const buildMatch = ({ userId, type, category, startDate, endDate }) => {
  const match = { userId: new mongoose.Types.ObjectId(userId) };

  if (type) match.type = type;
  if (category) match.category = new mongoose.Types.ObjectId(category);

  if (startDate || endDate) {
    match.date = {};
    if (startDate) match.date.$gte = startDate;
    if (endDate) match.date.$lte = endDate;
  }

  return match;
};

const aggregateTotals = async (match) => {
  return Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);
};

const normalizeTotals = (data) => {
  let income = 0;
  let expense = 0;

  data.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense,
  };
};

/* ----------------------------- CRUD CONTROLLERS ---------------------------- */

exports.getAllTransactionsByUser = async (req, res) => {
  const { type } = req.query;

  const query = { userId: req.user.id };
  if (type) query.type = type;

  const transactions = await Transaction.find(query)
    .populate("category", "name type")
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: transactions.length,
    transactions,
  });
};

exports.createTransaction = async (req, res) => {
  const { category, type } = req.body;

  const categoryDoc = await Category.findById(category);

  if (!categoryDoc) {
    return res.status(400).json({
      success: false,
      message: "Category not found",
    });
  }

  if (type !== categoryDoc.type) {
    return res.status(400).json({
      success: false,
      message: "Type and Category Mismatch",
    });
  }

  const transaction = await Transaction.create({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
    transaction,
  });
};

exports.updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  if (transaction.userId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update this transaction",
    });
  }

  const newType = req.body.type ?? transaction.type;
  const newCategory = req.body.category ?? transaction.category;

  if (req.body.type || req.body.category) {
    const categoryDoc = await Category.findById(newCategory);
    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    if (categoryDoc.type !== newType) {
      return res.status(400).json({
        success: false,
        message: "Type and Category mismatch",
      });
    }
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    transaction: updatedTransaction,
  });
};

exports.deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  if (transaction.userId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to delete this transaction",
    });
  }

  await Transaction.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
};

/* --------------------------- AGGREGATION CONTROLLERS ----------------------- */

exports.calculateSumByUser = async (req, res) => {
  const match = buildMatch({
    userId: req.user.id,
    type: req.query.type,
    category: req.query.category,
  });

  const totals = await aggregateTotals(match);

  res.status(200).json({
    success: true,
    ...normalizeTotals(totals),
  });
};

exports.calculateSumByYear = async (req, res) => {
  const year = Number(req.params.year);

  const match = buildMatch({
    userId: req.user.id,
    type: req.query.type,
    category: req.query.category,
    startDate: new Date(year, 0, 1),
    endDate: new Date(year, 11, 31, 23, 59, 59),
  });

  const totals = await aggregateTotals(match);

  res.status(200).json({
    success: true,
    year,
    ...normalizeTotals(totals),
  });
};

exports.calculateSumByMonth = async (req, res) => {
  const { year, month } = req.params;

  const match = buildMatch({
    userId: req.user.id,
    type: req.query.type,
    category: req.query.category,
    startDate: new Date(year, month - 1, 1),
    endDate: new Date(year, month, 0, 23, 59, 59),
  });

  const totals = await aggregateTotals(match);

  res.status(200).json({
    success: true,
    year,
    month,
    ...normalizeTotals(totals),
  });
};
