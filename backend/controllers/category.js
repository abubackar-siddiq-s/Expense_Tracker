const Category = require('../models/category');

// Controller function to get all categories for a particular user
exports.getAllCategories = async (req, res) => {
  // Get the userId from the authenticated request object
  const userId = req.user.id;
  
  console.log(`GET request received for all categories for user: ${userId}`);
  try {
    // Find categories that match the userId
    const categories = await Category.find({ userId });
    // Since categories are stored as objects, we'll map them to an array of names.
    const categoryNames = categories.map(cat => cat.name);
    res.status(200).json(categoryNames);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to add a new category for a particular user
exports.addCategory = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;
  
  // Server-side validation
  if (!name || name.trim() === '') {
    console.warn('POST request received. Invalid category name.');
    return res.status(400).json({ message: 'Category name is required.' });
  }

  try {
    // Find a category with the same name and userId to check for duplicates
    const existingCategory = await Category.findOne({ name: name.trim(), userId });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category name already exists for this user.' });
    }

    // Create a new category instance, including the userId
    const newCategory = new Category({ name: name.trim(), userId });
    await newCategory.save();

    console.log('POST request received. New category added:', newCategory);
    res.status(201).json({ name: newCategory.name });
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to update a category for a particular user
exports.updateCategory = async (req, res) => {
  const originalName = req.params.name;
  const { name: newName } = req.body;
  const userId = req.user.id;

  try {
    // Find a category with the new name and userId to check for duplicates
    const existingCategory = await Category.findOne({ name: newName.trim(), userId });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category name already exists for this user.' });
    }

    // Find and update the category by its original name AND userId
    const updatedCategory = await Category.findOneAndUpdate(
      { name: originalName, userId },
      { name: newName.trim() },
      { new: true, runValidators: true }
    );

    if (updatedCategory) {
      console.log(`PATCH request received. Category "${originalName}" updated to "${newName}" for user: ${userId}.`);
      res.status(200).json({ oldName: originalName, newName: updatedCategory.name });
    } else {
      console.warn(`PATCH request received. Category "${originalName}" not found for user: ${userId}.`);
      res.status(404).json({ message: 'Category not found.' });
    }
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete a category for a particular user
exports.deleteCategory = async (req, res) => {
  const name = req.params.name;
  const userId = req.user.id;
  
  try {
    // Find and delete the category that matches both the name AND userId
    const result = await Category.findOneAndDelete({ name, userId });
    
    if (result) {
      console.log(`DELETE request received. Category "${name}" deleted.`);
      res.status(200).json({ message: 'Category deleted successfully.' });
    } else {
      console.warn(`DELETE request received. Category "${name}" not found for user: ${userId}.`);
      res.status(404).json({ message: 'Category not found.' });
    }
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
