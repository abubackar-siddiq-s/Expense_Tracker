// This is the main server file for the Expense Tracker backend.

const express = require('express');
const cors = require('cors');

// Import the database connection function
const connectDB = require('./db');

// Import all the API routes
const incomeRoutes = require('./routes/income');
const expenseRoutes = require('./routes/expense');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user'); // <-- New User Routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database before starting the server.
connectDB();

// Middleware setup
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // Parse incoming JSON data

// A simple welcome route for the root URL
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Expense Tracker Backend API!' });
});

// Register all the route handlers
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes); // <-- Register the new user routes

// General error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the backend at http://localhost:${PORT}`);
});
