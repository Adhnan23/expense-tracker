const mongoose = require("mongoose");
const ENV = require("../utils/env");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.dbUri);
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
