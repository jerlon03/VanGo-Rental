const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'error', message: 'Invalid token.' });
    }
    req.user = decoded; // assuming decoded contains user details
    next();
  });
};

// Use CommonJS syntax for exporting
module.exports = {
  verifyToken
};
