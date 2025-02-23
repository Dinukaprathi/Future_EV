const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
  async signIn(req, res) {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Check if the user exists by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the password matches
      const isMatch = user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).json({ message: 'User signed in successfully', token });
    } catch (error) {
      console.error('Error signing in user:', error);
      res.status(500).json({ message: 'Error signing in user', error: error.message });
    }
  }
}

module.exports = new AuthController();