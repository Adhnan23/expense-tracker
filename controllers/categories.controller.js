const Category = require("../models/Category");

const get = async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  const categories = await Category.find(filter);
  res.json({ success: true, data: categories });
};

const insert = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
};

const update = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category)
    res.status(404).json({ success: false, message: "Category not found" });
  res.json({ success: true, data: category });
};

const remove = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id, {
    returnOriginal: true,
  });
  if (!category)
    res.status(404).json({ success: false, message: "Category not found" });
  res.json({ success: true, message: "Category deleted" });
};

module.exports = {
  get,
  insert,
  update,
  remove,
};
