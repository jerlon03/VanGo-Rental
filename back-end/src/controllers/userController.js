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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials.' });
    }

    // Generate a JWT token with the user's ID and email
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    // Send the token to the client
    res.status(200).json({ status: 'success', token });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
};

exports.logout = (req, res) => {
  // Since JWT is stateless, there's no server-side session to destroy
  // Instead, we can just inform the client to remove the token

  res.status(200).json({ message: 'Logout successful. Please remove the token from client storage.' });
};

exports.getUserInfo = async (req, res) => {
  if (!req.user || !req.user.user_id) {
    return res.status(400).json({ status: 'error', message: 'User ID is missing in the request.' });
  }

  const userId = req.user.user_id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    const fullName = `${user.first_name} ${user.last_name}`;
    res.status(200).json({ name: fullName, email: user.email, role: user.role });
  } catch (err) {
    console.error('Error fetching user info by ID:', err);
    res.status(500).json({ status: 'error', message: 'Error fetching user information.' });
  }
};



