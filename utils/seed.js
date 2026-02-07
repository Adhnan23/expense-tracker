const Category = require("../models/Category");

const categories = [
  { name: "Salary", type: "income" },
  { name: "Freelance", type: "income" },
  { name: "Investments", type: "income" },
  { name: "Food", type: "expense" },
  { name: "Rent", type: "expense" },
  { name: "Utilities", type: "expense" },
  { name: "Entertainment", type: "expense" },
  { name: "Transportation", type: "expense" },
  { name: "Gifts", type: "expense" },
  { name: "Bonus", type: "income" },
];

const seedCategories = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(categories);
      console.log("Categories seeded successfully!");
    } else {
      console.log("Categories already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

module.exports = seedCategories;
