const jwt = require('jsonwebtoken');
const User = require('../model/users.model');

exports.findAll = function(req, res) {
  User.findAll(function(err, users) {
    if (err) {
      res.status(500).send({ error: true, message: 'Error retrieving users' });
    } else {
      res.status(200).send({ error: false, data: users });
    }
  });
};


exports.create = function(req, res) {
  const newUser = req.body;

  // Validate all required fields
  if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.password) {
    return res.status(400).send({
      error: true,
      message: 'Please provide first_name, last_name, email, and password'
    });
  }

  // Proceed with user creation if validation passes
  User.create(newUser, function(err, userId) {
    if (err) {
      console.error('Error adding user:', err); // Logging the error for debugging
      return res.status(500).send({
        error: true,
        message: 'Error adding user'
      });
    }
    res.status(201).send({
      error: false,
      message: 'User added successfully',
      data: { userId: userId }
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Call the User model's findByEmailAndPassword function
  User.findByEmailAndPassword(email, password, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred', error: err });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User is authenticated, generate a JWT with role
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Include role in payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: '1h' } // token expiration time
    );

    // Send the token, user data, and role in the response
    res.status(200).json({ message: 'Login successful', token, user, role: user.role });
  });
};

exports.logout = (req, res) => {
  // Since JWT is stateless, there's no server-side session to destroy
  // Instead, we can just inform the client to remove the token

  res.status(200).json({ message: 'Logout successful. Please remove the token from client storage.' });
};
