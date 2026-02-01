require("dotenv").config({
  quiet: true, // to remove ads from dotenv
});

const requiredEnvVars = [
  "PORT",
  "DB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "BCRYPT_SECRET",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const ENV = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  bcrypt: {
    secret: process.env.BCRYPT_SECRET,
  },
};
module.exports = ENV;
