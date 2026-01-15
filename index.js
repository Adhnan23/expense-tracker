const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const ENV = require("./utils/env");

const apiRouter = require("./routes");

const app = express();
connectDB();

app.use(express.json());

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(ENV.port, () =>
  console.log(`Server running on http://localhost:${ENV.port}`)
);
