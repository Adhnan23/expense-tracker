const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((el) => el.message);
    message = errors.join(", ");
  }

  if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `${field} already exists`;
  }

  if (err.errors && Array.isArray(err.errors)) {
    statusCode = 400;
    message = err.errors.map((e) => e.msg).join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
