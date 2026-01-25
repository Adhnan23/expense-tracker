const express = require("express");
const apiRouter = express.Router();
const categoriesRouter = require("./categories.routes");
const usersRouter = require("./users.routes");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/auth", usersRouter);

module.exports = apiRouter;
