const Expense = require('../models/expense');

// Controller function to get all expenses for a particular user
exports.getAllExpenses = async (req, res) => {
  // Get the userId from the authenticated request object
  const userId = req.user.id;

  console.log(`GET request received for all expenses for user: ${userId}`);
  try {
    // Find expenses that match the userId
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to add a new expense for a particular user
exports.addExpense = async (req, res) => {
  // Get the userId from the authenticated request object
  const userId = req.user.id;
  const { amount, category, date } = req.body;

  // Server-side validation
  if (!amount || amount <= 0 || !category || !date) {
    console.warn('POST request received with invalid data for new expense.');
    return res.status(400).json({ message: 'Invalid expense data. Amount, category, and date are required.' });
  }

  try {
    // Create a new expense instance, including the userId
    const newExpense = new Expense({ amount, category, date, userId });
    await newExpense.save();

    console.log('POST request received. New expense added:', newExpense);
    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to update an expense for a particular user
exports.updateExpense = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const updatedData = req.body;

  try {
    // Find and update the expense by its ID AND userId
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId },
      { ...updatedData },
      { new: true, runValidators: true }
    );

    if (updatedExpense) {
      console.log(`PATCH request received. Expense with ID ${id} updated for user: ${userId}.`);
      res.status(200).json(updatedExpense);
    } else {
      console.warn(`PATCH request received. Expense with ID ${id} not found for user: ${userId}.`);
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete an expense for a particular user
exports.deleteExpense = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    // Find and delete the expense by its ID AND userId
    const result = await Expense.findOneAndDelete({ _id: id, userId });

    if (result) {
      console.log(`DELETE request received. Expense with ID ${id} deleted for user: ${userId}.`);
      res.status(200).json({ message: 'Expense deleted successfully' });
    } else {
      console.warn(`DELETE request received. Expense with ID ${id} not found for user: ${userId}.`);
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
