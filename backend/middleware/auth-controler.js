const jwt = require('jsonwebtoken');
const User = require('../models/User-model'); // Import User model

const auth = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

module.exports = auth;
