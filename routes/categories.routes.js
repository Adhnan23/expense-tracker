const express = require("express");

const {
  getCategoriesValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../middlewares/validators/categoryValidator");

const {
  get,
  insert,
  update,
  remove,
} = require("../controllers/categories.controller");
const { userAuth, systemAuth } = require("../middlewares/auth");

const categoriesRouter = express.Router();

categoriesRouter.get("/", userAuth, getCategoriesValidator, get);

categoriesRouter.post("/", systemAuth, createCategoryValidator, insert);

categoriesRouter.put("/:id", systemAuth, updateCategoryValidator, update);

categoriesRouter.delete("/:id", systemAuth, deleteCategoryValidator, remove);

module.exports = categoriesRouter;
