const Transaction = require("../models/transaction.model");

const getAllTransactionsByUser = async (req, res) => {
  const type = req.query.type;
  const userId = req.user.id;
  let transactions;
  if (type) {
    transactions = await Transaction.find({ userId, type });
  }
  if (!type) {
    transactions = await Transaction.find({ userId });
  }

  res.status(200).json({
    success: true,
    message: "Transactions retrieved successfully",
    transactions,
  });
};

const createTransaction = async (req, res) => {
  const userId = req.user.id;
  const transactionData = req.body;
  transactionData.userId = userId;
  const newTransaction = await Transaction.create(transactionData);
  if (!newTransaction) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create transaction" });
  }
  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
    transaction: newTransaction,
  });
};

const updateTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    return res
      .status(404)
      .json({ success: false, message: "Transaction not found" });
  }

  const transactionData = req.body;
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    transactionData,
    { new: true },
  );

  if (!updatedTransaction) {
    return res
      .status(500)
      .json({ success: false, message: "Transaction failed to update" });
  }

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    transaction: updatedTransaction,
  });
};

const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    return res
      .status(404)
      .json({ success: false, message: "Transaction not found" });
  }
  const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
  if (!deletedTransaction)
    return res
      .status(500)
      .json({ success: false, message: "Transaction failed to delete" });

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
};

const calculateSumByUser = async (req, res) => {
  const userId = req.user.id;
  const { type, category } = req.query;
  const transactions = await Transaction.find({ userId });

  if (!transactions || transactions.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No transactions found",
      total: 0,
    });
  }

  let filteredTransactions = transactions;
  if (type)
    filteredTransactions = filteredTransactions.filter((t) => t.type === type);
  if (category)
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === category,
    );

  if (!type && !category) {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return res.status(200).json({
      success: true,
      message: "Total income and expense calculated successfully",
      totalIncome,
      totalExpense,
      total: totalIncome - totalExpense,
    });
  }

  const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  res.status(200).json({
    success: true,
    message: "Total calculated successfully",
    total,
  });
};

const calculateSumByYear = async (req, res) => {
  const userId = req.user.id;
  const { year } = req.params;
  const { type, category } = req.query;
  const transactions = await Transaction.find({ userId });

  if (!transactions || transactions.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No transactions found",
      total: 0,
    });
  }

  let filteredTransactions = transactions.filter((t) => {
    const transactionYear = new Date(t.date).getFullYear();
    return transactionYear === parseInt(year);
  });

  if (type)
    filteredTransactions = filteredTransactions.filter((t) => t.type === type);
  if (category)
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === category,
    );
  if (!type && !category) {
    const totalIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return res.status(200).json({
      success: true,
      message: "Total income and expense calculated successfully",
      totalIncome,
      totalExpense,
      total: totalIncome - totalExpense,
    });
  }
  const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  res.status(200).json({
    success: true,
    message: `Total for year ${year} calculated successfully`,
    total,
  });
};

const calculateSumByMonth = async (req, res) => {
  const userId = req.user.id;
  const { year, month } = req.params;
  const { type, category } = req.query;
  const transactions = await Transaction.find({ userId });

  if (!transactions || transactions.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No transactions found",
      total: 0,
    });
  }

  let filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    const transactionYear = date.getFullYear();
    const transactionMonth = date.getMonth() + 1;
    return (
      transactionYear === parseInt(year) && transactionMonth === parseInt(month)
    );
  });

  if (type)
    filteredTransactions = filteredTransactions.filter((t) => t.type === type);
  if (category)
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === category,
    );
  if (!type && !category) {
    const totalIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return res.status(200).json({
      success: true,
      message: "Total income and expense calculated successfully",
      totalIncome,
      totalExpense,
      total: totalIncome - totalExpense,
    });
  }
  const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  res.status(200).json({
    success: true,
    message: `Total for ${month}/${year} calculated successfully`,
    total,
  });
};
