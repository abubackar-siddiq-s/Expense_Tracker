// models/expense.js: Defines the schema and model for expense data.

const mongoose = require('mongoose');

// An expense schema defines the structure of each expense document.
const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true, // Amount is a required field
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // New field to link expense to a user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // References the 'User' model
  },
});

// The Expense model is a class that allows us to interact with the 'expenses' collection in MongoDB.
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;