// models/category.js: Defines the schema and model for category data.

const mongoose = require("mongoose");

// A schema for categories. We're keeping it simple for now, as categories are just strings.
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // New field to link category to a user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // References the 'User' model
  },
});

// Ensure category names are unique per user
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

// The Category model allows us to interact with the 'categories' collection.
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
