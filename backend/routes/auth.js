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
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token as an HTTP-only cookie
    res.cookie('token', token, {
      // httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
      // secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
      maxAge: 3600000, // Expires in 1 hour
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log('error occured !!',err);
    
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login Route (Sign In)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email); // Debugging statement
      return res.status(400).json({ message: 'User not found' });
    }

    // Step 2: Compare input password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email); // Debugging statement
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log("Password match successful for user:", email);

    // Step 3: Generate JWT token if authentication is successful
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Step 4: Set the JWT as a cookie
    res.cookie('token', token, {
    //   httpOnly: false, // Ensures the cookie can't be accessed via JavaScript
    //   secure: false, // Only sent over HTTPS in production
    //   maxAge: 3600000,
    //   sameSite:'lax' // Expires in 1 hour
    // 
    });
    console.log(token);
    

    console.log("Login successful, token generated for user:", email);
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error("Error during login process:", err);
    res.status(500).json({ message: 'Error logging in' });
  }
});


// Logout Route
// Logout Route
router.post('/logout', (req, res) => {
  // Clear the 'token' cookie
  res.clearCookie('token', );

  // Send a response to confirm logout
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
