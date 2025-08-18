const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// POST /api/users/register: Endpoint for user registration.
router.post('/register', userController.registerUser);

// POST /api/users/login: Endpoint for user login.
router.post('/login', userController.loginUser);

module.exports = router;
