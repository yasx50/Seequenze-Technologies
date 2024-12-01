const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User-model');
const router = express.Router();
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('dotenv').config();

// Use cookie-parser middleware to handle cookies
router.use(cookieParser());

// Register Route (Sign Up)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET);

    // Send the token as an HTTP-only cookie
    res.cookie('token', token);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log('Error occurred:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login Route (Sign In)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    // Set the JWT as a cookie
    res.cookie('token', token)
    

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  // Clear the 'token' cookie
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
