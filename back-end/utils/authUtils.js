// // utils/authUtils.js
// const jwt = require('jsonwebtoken');

// // Function to generate a JWT token
// function generateToken(payload) {
//   return jwt.sign(payload, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpyZWVkQGV4dG9sZS5jb20ifQ.o426f0XDnsUwActVt14Cr3X3IUqPwfv6yaN5nRaZhew', { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual secret key
// }

// // Function to verify a JWT token
// function verifyToken(token) {
//   try {
//     const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpyZWVkQGV4dG9sZS5jb20ifQ.o426f0XDnsUwActVt14Cr3X3IUqPwfv6yaN5nRaZhew'); // Replace 'your_secret_key' with your actual secret key
//     return decoded;
//   } catch (err) {
//     return null;
//   }
// }

// module.exports = {
//   generateToken,
//   verifyToken
// };
