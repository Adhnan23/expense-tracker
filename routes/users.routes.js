const express = require("express");

const {registerValidator,loginValidator} = require("../middlewares/validators/userValidator");

const {register,login} = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.post("/sign-up", registerValidator, register);

usersRouter.post("/sign-in", loginValidator, login);


module.exports = usersRouter;
