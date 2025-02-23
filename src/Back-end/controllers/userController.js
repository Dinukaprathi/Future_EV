const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
  async signUp(req, res) {
    const { username, email, password } = req.body;

    // Validate input data
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Check if the user already exists by email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user with plain text password
      const newUser = new User({
        username,
        email,
        password,  // Store the plain password
      });

      // Save the new user
      await newUser.save();

      // Generate a JWT token
      const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  }
}

module.exports = new UserController();