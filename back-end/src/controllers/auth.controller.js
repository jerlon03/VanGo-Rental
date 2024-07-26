// // controllers/auth.controller.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/users.model');

// function generateToken(payload) {
//   return jwt.sign(payload, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpyZWVkQGV4dG9sZS5jb20ifQ.o426f0XDnsUwActVt14Cr3X3IUqPwfv6yaN5nRaZhew', { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual secret key
// }

// exports.login = function(req, res) {
//   const { email, password } = req.body;

//   User.findByEmailAndPassword(email, password, (err, user) => {
//     if (err || !user) {
//       res.status(401).json({ error: true, message: 'Invalid email or password' });
//     } else {
//       const token = generateToken({ id: user.user_id, role: user.role });
//       res.json({ error: false, message: 'Login successful', token });
//     }
//   });
// };
