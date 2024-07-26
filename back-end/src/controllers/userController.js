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
  const newUser = new User(req.body);
  if (!newUser.first_name || !newUser.last_name) {
    res.status(400).send({ error: true, message: 'Please provide first_name and last_name' });
  } else {
    User.create(newUser, function(err, user) {
      if (err) {
        res.status(500).send({ error: true, message: 'Error adding user' });
      } else {
        res.status(201).send({ error: false, message: 'User added successfully', data: user });
      }
    });
  }
};


