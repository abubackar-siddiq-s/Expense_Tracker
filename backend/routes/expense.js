const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const authMiddleware = require('../middleware/auth'); // Import the auth middleware

// GET /api/expenses: Fetches all expenses for a user.
router.get('/', authMiddleware.authenticate, expenseController.getAllExpenses);

// POST /api/expenses: Adds a new expense for a user.
router.post('/', authMiddleware.authenticate, expenseController.addExpense);

// PATCH /api/expenses/:id: Updates an expense by its ID for a user.
router.patch('/:id', authMiddleware.authenticate, expenseController.updateExpense);

// DELETE /api/expenses/:id: Deletes an expense by its ID for a user.
router.delete('/:id', authMiddleware.authenticate, expenseController.deleteExpense);

module.exports = router;
