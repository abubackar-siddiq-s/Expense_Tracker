const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const authMiddleware = require('../middleware/auth'); // Import the auth middleware

// GET /api/categories: Fetches all categories for a user.
router.get('/', authMiddleware.authenticate, categoryController.getAllCategories);

// POST /api/categories: Adds a new category for a user.
router.post('/', authMiddleware.authenticate, categoryController.addCategory);

// PATCH /api/categories/:name: Updates a category by its name for a user.
router.patch('/:name', authMiddleware.authenticate, categoryController.updateCategory);

// DELETE /api/categories/:name: Deletes a category by its name for a user.
router.delete('/:name', authMiddleware.authenticate, categoryController.deleteCategory);

module.exports = router;
