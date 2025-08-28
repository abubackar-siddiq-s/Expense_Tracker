const Income = require('../models/income');

// Controller function to get all incomes for a particular user
exports.getAllIncomes = async (req, res) => {
  // Get the userId from the authenticated request object
  const userId = req.user.id;

  console.log(`GET request received for all incomes for user: ${userId}`);
  try {
    // Find incomes that match the userId
    const incomes = await Income.find({ userId });
    res.status(200).json(incomes);
  } catch (err) {
    console.error('Error fetching incomes:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to add a new income for a particular user
exports.addIncome = async (req, res) => {
  // Get the userId from the authenticated request object
  const userId = req.user.id;
  const { amount, source, date } = req.body;

  // Server-side validation
  if (!amount || amount <= 0 || !source || !date) {
    console.warn('POST request received with invalid data for new income.');
    return res.status(400).json({ message: 'Invalid income data. Amount, source, and date are required.' });
  }

  try {
    // Create a new income instance, including the userId
    const newIncome = new Income({ amount, source, date, userId });
    await newIncome.save();

    console.log('POST request received. New income added:', newIncome);
    res.status(201).json(newIncome);
  } catch (err) {
    console.error('Error adding income:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to update an income for a particular user
exports.updateIncome = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const updatedData = req.body;

  try {
    // Find and update the income by its ID AND userId
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: id, userId },
      { ...updatedData },
      { new: true, runValidators: true }
    );

    if (updatedIncome) {
      console.log(`PATCH request received. Income with ID ${id} updated for user: ${userId}.`);
      res.status(200).json(updatedIncome);
    } else {
      console.warn(`PATCH request received. Income with ID ${id} not found for user: ${userId}.`);
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (err) {
    console.error('Error updating income:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete an income for a particular user
exports.deleteIncome = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    // Find and delete the income by its ID AND userId
    const result = await Income.findOneAndDelete({ _id: id, userId });

    if (result) {
      console.log(`DELETE request received. Income with ID ${id} deleted for user: ${userId}.`);
      res.status(200).json({ message: 'Income deleted successfully' });
    } else {
      console.warn(`DELETE request received. Income with ID ${id} not found for user: ${userId}.`);
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
