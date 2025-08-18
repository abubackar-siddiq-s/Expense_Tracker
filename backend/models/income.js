// models/income.js: Defines the schema and model for income data.

const mongoose = require('mongoose');

// A Schema defines the structure of your data (like a blueprint).
const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // New field to link income to a user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // References the 'User' model
  },
});

// A Model is a class that we can use to create, find, and delete data.
const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
