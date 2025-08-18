// models/user.js: Defines the schema and model for user data.

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures every user has a unique email
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;