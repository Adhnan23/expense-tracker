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

const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategoriesValidator, get);

categoriesRouter.post("/", createCategoryValidator, insert);

categoriesRouter.put("/:id", updateCategoryValidator, update);

categoriesRouter.delete("/:id", deleteCategoryValidator, remove);

module.exports = categoriesRouter;
