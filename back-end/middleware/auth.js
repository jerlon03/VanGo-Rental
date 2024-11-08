const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateResetToken = (userId) => {
  const payload = { userId }; // Create a variable to hold the payload
  return jwt.sign(payload, process.env.JWT_SECRET); // Removed expiration
};
const verifyResetToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId; // Assuming the user ID is stored in the 'userId' field of the token
  } catch (error) {
    console.error('Token verification error:', error);
    return null; // Return null if the token is invalid or expired
  }
};

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
  verifyToken,
  generateResetToken ,// Export the generateToken function
  verifyResetToken

};
