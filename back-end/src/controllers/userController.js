const jwt = require('jsonwebtoken');
const User = require('../model/users.model');
const Driver = require('../model/driver.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const transporter = require('../../config/mailer.config')
const { generateResetToken, verifyResetToken } = require('../../middleware/auth')
require('dotenv').config();

exports.findAll = function (req, res) {
  User.findAll(function (err, users) {
    if (err) {
      res.status(500).send({ error: true, message: 'Error retrieving users' });
    } else {
      res.status(200).send({ error: false, data: users });
    }
  });
};


exports.createDriver = async function (req, res) {
  const newUser = req.body;

  // Define required fields
  const requiredFields = ['first_name', 'last_name', 'email', 'password'];
  for (const field of requiredFields) {
    if (!newUser[field]) {
      return res.status(400).send({
        error: true,
        message: `Please provide ${field}`
      });
    }
  }

  try {
    // Check if the email already exists
    const existingUser = await new Promise((resolve, reject) => {
      User.getByEmail(newUser.email, (err, user) => {
        if (err) {
          console.error('Error checking email:', err);
          return reject(err);
        }
        resolve(user);
      });
    });

    if (existingUser) {
      return res.status(400).send({
        error: true,
        message: 'Email already exists. Please use a different email.'
      });
    }

    // Hash the password before saving the user
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    // Proceed with user creation
    const userId = await new Promise((resolve, reject) => {
      User.create(newUser, (err, id) => {
        if (err) {
          console.error('Error adding user:', err);
          return reject(err);
        }
        console.log('User created successfully with ID:', id);
        resolve(id);
      });
    });

    // Create driver record after user creation
    const newDriver = {
      user_id: userId,
    };

    const driverId = await new Promise((resolve, reject) => {
      Driver.createDriver(newDriver, (err, id) => {
        if (err) {
          console.error('Error adding driver:', err);
          return reject(err);
        }
        console.log('Driver created successfully with ID:', id);
        resolve(id);
      });
    });

    res.status(201).send({
      error: false,
      message: 'User and driver added successfully',
      data: { userId: userId, driverId: driverId }
    });
  } catch (error) {
    console.error('Error during user/driver creation:', error);
    res.status(500).send({
      error: true,
      message: 'Error creating user and driver'
    });
  }
};

exports.updateDriver = async function (req, res) {
  const userId = req.params.userId; // Assuming userId is passed as a URL parameter
  const updatedUserData = req.body;

  // Validate required fields
  const requiredFields = ['first_name', 'last_name', 'email', 'experience_years', 'vehicle_assigned', 'phoneNumber', 'location'];
  for (const field of requiredFields) {
    if (!updatedUserData[field]) {
      return res.status(400).send({
        error: true,
        message: `Please provide ${field}`
      });
    }
  }

  try {
    // Check if the email already exists for another user
    const existingUser = await new Promise((resolve, reject) => {
      User.getByEmail(updatedUserData.email, (err, user) => {
        if (err) {
          console.error('Error checking email:', err);
          return reject(err);
        }
        resolve(user);
      });
    });

    if (existingUser && existingUser.user_id !== userId) {
      return res.status(400).send({
        error: true,
        message: 'Email already exists. Please use a different email.'
      });
    }

    // Update user details
    await new Promise((resolve, reject) => {
      User.update(userId, updatedUserData, (err) => {
        if (err) {
          console.error('Error updating user:', err);
          return reject(err);
        }
        resolve();
      });
    });

    // Update driver details
    const driverData = {
      experience_years: updatedUserData.experience_years,
      vehicle_assigned: updatedUserData.vehicle_assigned,
      phoneNumber: updatedUserData.phoneNumber,
      location: updatedUserData.location
    };

    await new Promise((resolve, reject) => {
      Driver.updateDriver(userId, driverData, (err) => {
        if (err) {
          console.error('Error updating driver:', err);
          return reject(err);
        }
        resolve();
      });
    });

    res.status(200).send({
      error: false,
      message: 'User and driver details updated successfully'
    });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).send({
      error: true,
      message: 'Error updating user and driver details'
    });
  }
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

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  User.getByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).send({ message: "Database error", details: err });
    }
    if (!user) {
      return res.status(404).send({ message: "Email does not exist" }); // Correctly handle non-existing email
    }

    // Generate a password reset token
    const resetToken = generateResetToken(user.user_id); // Call the function to generate a unique token

    // Create the reset link using FRONTEND_URL
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: "Error sending email", details: error });
      }
      return res.status(200).send({ message: "Password reset email sent successfully" });
    });
  });
};

exports.changePassword = (req, res) => {
  const { token, newPassword } = req.body;

  // Validate input
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  // Verify the reset token and extract user ID
  const userId = verifyResetToken(token); // Implement this function to decode the token and get userId

  if (!userId) {
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }

  // Hash the new password
  bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing new password:', err);
      return res.status(500).send({ message: 'Error hashing new password' });
    }

    // Update the user's password in the database
    User.updatePassword(userId, hashedPassword, (err) => { // Implement this method in your User model
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).send({ message: 'Error updating password' });
      }

      res.status(200).send({ message: 'Password changed successfully' });
    });
  });
};






