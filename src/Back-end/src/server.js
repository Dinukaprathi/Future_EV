const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const inquiryRoutes = require('../routes/inquiryRoutes');
const authRoutes = require('../routes/signinRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Corrected frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Use user routes
app.use('/api/users', userRoutes);

// Use inquiry routes
app.use('/api/inquiries', inquiryRoutes);

// Use auth routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});