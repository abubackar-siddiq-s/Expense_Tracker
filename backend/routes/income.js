const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income');
const authMiddleware = require('../middleware/auth'); // Import the auth middleware

// GET /api/incomes: Fetches all incomes for a user.
router.get('/', authMiddleware.authenticate, incomeController.getAllIncomes);

// POST /api/incomes: Adds a new income for a user.
router.post('/', authMiddleware.authenticate, incomeController.addIncome);

// PATCH /api/incomes/:id: Updates an income by its ID for a user.
router.patch('/:id', authMiddleware.authenticate, incomeController.updateIncome);

// DELETE /api/incomes/:id: Deletes an income by its ID for a user.
router.delete('/:id', authMiddleware.authenticate, incomeController.deleteIncome);

module.exports = router;
