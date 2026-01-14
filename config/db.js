const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`✔ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed:`, error.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠ MongoDB disconnected. Retrying…");
  });

  mongoose.connection.on("error", (err) => {
    console.error("🚨 MongoDB error:", err);
  });
};

module.exports = connectDB;
