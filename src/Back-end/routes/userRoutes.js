const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define the signup route
router.post('/signup', userController.signUp);

module.exports = router;