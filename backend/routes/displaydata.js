const express = require('express');
const router = express.Router();
const User = require('../models/User-model');
const Task = require('../models/Task-model');

// Route to get user info and tasks based on the cookie
router.get('/', async (req, res) => {
  try {
    // Get the user data from the cookie
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const { username, userId } = userCookie;
    console.log('this is cooie display route ',userCookie);
    

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
      console.log('user not found display route');
      
    }

    // Find the user by their userId
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

module.exports = router;  // Correctly export the router
