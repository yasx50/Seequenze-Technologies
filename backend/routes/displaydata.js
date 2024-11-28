const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User-model');
const Task = require('../models/Task-model');
const cookieParser = require('cookie-parser');
const authenticated = require('../middleware/auth-controler')

require('dotenv').config();

router.use(cookieParser());

// Middleware to verify the token and set req.user
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Route to get user info and tasks based on the cookie
router.get('/', verifyToken, async (req, res) => {
  try {
    // Get user ID from the verified token payload
    const userId = req.user.id;

    // Find the user by their userId and populate their tasks
    const user = await User.findById(userId).populate('tasks');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user data with tasks
    res.json({ user, tasks: user.tasks });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;