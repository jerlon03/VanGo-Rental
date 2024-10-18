const jwt = require('jsonwebtoken');
const User = require('../model/users.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  // Hash the password before saving the user
  bcrypt.hash(newUser.password, saltRounds, function(err, hashedPassword) {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send({
        error: true,
        message: 'Error hashing password'
      });
    }
    // Replace the plain text password with the hashed password
    newUser.password = hashedPassword;

    // Proceed with user creation if validation passes and password is hashed
    User.create(newUser, function(err, userId) {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).send({
          error: true,
          message: 'Error adding user'
        });
      }
      console.log('User created successfully with ID:', userId);
      res.status(201).send({
        error: false,
        message: 'User added successfully',
        data: { userId: userId }
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Call model to find the user by email and compare passwords
  User.findByEmailAndPassword(email, password, (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Error logging in', error: err }); // Send the error back to the client
    }

    if (user) {
      // Generate a JWT token, making sure to reference user_id
      const token = jwt.sign(
        { id: user.user_id, email: user.email, role: user.role }, // Ensure this matches your model
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      // Respond with the token and user role
      res.json({ token, role: user.role });
    } else {
      res.status(400).json({ message: 'Invalid email or password.' });
    }
  });
};


exports.logout = (req, res) => {
  // Since JWT is stateless, there's no server-side session to destroy
  // Instead, we can just inform the client to remove the token

  res.status(200).json({ message: 'Logout successful. Please remove the token from client storage.' });
};

// controller/users.controller.js
exports.getProfile = (req, res) => {
  const userId = req.user.id; // Extract userId from the token payload

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  });
};



