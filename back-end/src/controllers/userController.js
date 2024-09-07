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
      console.error('Error hashing password:', err); // Logging the error for debugging
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
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  User.findByEmailAndPassword(email, password, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred', error: err });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Ensure user.id is included in the token
    const token = jwt.sign(
      { id: user.user_id, email: user.email, role: user.role }, // Adjust `user.user_id` if necessary
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, user, role: user.role });
  });
};

exports.logout = (req, res) => {
  // Since JWT is stateless, there's no server-side session to destroy
  // Instead, we can just inform the client to remove the token

  res.status(200).json({ message: 'Logout successful. Please remove the token from client storage.' });
};

// controller/users.controller.js
exports.getProfile = (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or incorrect format' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token:', err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    console.log('Decoded token:', decoded); // Log the entire decoded token
    const userId = decoded.id;
    console.log('User ID from token:', userId);

    // Proceed with user lookup
    User.findById(userId, (err, user) => {
      if (err) {
        console.error('Error fetching user by ID:', err);
        return res.status(500).json({ message: 'Error fetching profile', error: err });
      }
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user });
    });
  });
};




