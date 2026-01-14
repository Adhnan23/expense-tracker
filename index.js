const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const apiRouter = require("./routes");

const port = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
