const express = require("express");
const apiRouter = express.Router();
const categoriesRouter = require("./categories.routes");
const usersRouter = require("./users.routes");
const transactionsRouter = require("./transaction.routes");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/auth", usersRouter);
apiRouter.use("/transactions", transactionsRouter);

module.exports = apiRouter;
