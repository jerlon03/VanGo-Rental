const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Extract the token from the "Authorization" header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Token comes after "Bearer "

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user info to req object
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'error', message: 'Token expired' });
    }
    return res.status(400).json({ status: 'error', message: 'Invalid token' });
  }

};
