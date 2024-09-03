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