const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    // If token doesn't exist, send an error
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract data from decoded token
    const userId = decoded.id;        // Extracted user ID
    const username = decoded.username; // Extracted username
console.log('the middleware hits!!!');


    // You can also attach the user data to the request object for later use
    req.user = { id: userId, username };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Error during token verification:', err);
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

module.exports = auth;
