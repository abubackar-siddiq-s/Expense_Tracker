// db.js: A dedicated file for connecting to the MongoDB database.

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// The connection string is like the address to your database.
// You need to replace '<db_password>' with your actual password.
// const dbURI = "mongodb://localhost:27017/mern-finance-tracker";
// const dbURI = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.wij919j.mongodb.net/${process.env.name}?retryWrites=true&w=majority&appName=Cluster0`;
const dbURI = 'mongodb+srv://abubackarsiddiq:8pBIk9uLG6XkO2it@cluster0.wij919j.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';
// Function to connect to the database.
const connectDB = async () => {
  try {
    // Use mongoose to connect to the provided URI.
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    // If the connection fails, log the error and exit the process.
    console.error('MongoDB connection failed:', err.message);
    // process.exit(1) exits the application with an error code.
    process.exit(1);
  }
};

module.exports = connectDB;
