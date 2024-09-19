const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(400).json({ status: 'error', message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // 'Bearer <token>'
  if (!token) {
    return res.status(400).json({ status: 'error', message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
    req.user = decoded;  // Attach decoded user data to request object
    next();
  });
};

module.exports = {
  verifyToken
};
