const jwt = require("jsonwebtoken");
const User = require("../model/users.model");
const Driver = require("../model/driver.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const transporter = require("../../config/mailer.config");
const {
  generateResetToken,
  verifyResetToken,
} = require("../../middleware/auth");
require("dotenv").config();

exports.findAll = function (req, res) {
  User.findAll(function (err, users) {
    if (err) {
      res.status(500).send({ error: true, message: "Error retrieving users" });
    } else {
      res.status(200).send({ error: false, data: users });
    }
  });
};

exports.createDriver = async function (req, res) {
  const newUser = req.body;

  // Define required fields
  const requiredFields = ["first_name", "last_name", "email", "password"];
  for (const field of requiredFields) {
    if (!newUser[field]) {
      return res.status(400).send({
        error: true,
        message: `Please provide ${field}`,
      });
    }
  }

  try {
    // Check if the email already exists
    const existingUser = await new Promise((resolve, reject) => {
      User.getByEmail(newUser.email, (err, user) => {
        if (err) {
          console.error("Error checking email:", err);
          return reject(err);
        }
        resolve(user);
      });
    });

    if (existingUser) {
      return res.status(400).send({
        error: true,
        message: "Email already exists. Please use a different email.",
      });
    }

    // Hash the password before saving the user
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    // Proceed with user creation
    const userId = await new Promise((resolve, reject) => {
      User.create(newUser, (err, id) => {
        if (err) {
          console.error("Error adding user:", err);
          return reject(err);
        }
        console.log("User created successfully with ID:", id);
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
          console.error("Error adding driver:", err);
          return reject(err);
        }
        console.log("Driver created successfully with ID:", id);
        resolve(id);
      });
    });

    res.status(201).send({
      error: false,
      message: "User and driver added successfully",
      data: { userId: userId, driverId: driverId },
    });
  } catch (error) {
    console.error("Error during user/driver creation:", error);
    res.status(500).send({
      error: true,
      message: "Error creating user and driver",
    });
  }
};

exports.updateDriver = async function (req, res) {
  const userId = req.params.userId; // Assuming userId is passed as a URL parameter
  const updatedUserData = req.body;

  // Validate required fields
  const requiredFields = [
    "first_name",
    "last_name",
    "email",
    "experience_years",
    "phoneNumber",
    "location",
  ];
  for (const field of requiredFields) {
    if (!updatedUserData[field]) {
      return res.status(400).send({
        error: true,
        message: `Please provide ${field}`,
      });
    }
  }

  try {
    // Update user details
    await new Promise((resolve, reject) => {
      User.update(userId, updatedUserData, (err) => {
        if (err) {
          console.error("Error updating user:", err);
          return reject(err);
        }
        resolve();
      });
    });

    // Update driver details
    const driverData = {
      experience_years: updatedUserData.experience_years,
      phoneNumber: updatedUserData.phoneNumber,
      location: updatedUserData.location,
    };

    await new Promise((resolve, reject) => {
      Driver.updateDriver(userId, driverData, (err) => {
        if (err) {
          console.error("Error updating driver:", err);
          return reject(err);
        }
        resolve();
      });
    });

    res.status(200).send({
      error: false,
      message: "User and driver details updated successfully",
    });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).send({
      error: true,
      message: "Error updating user and driver details",
    });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // Call model to find the user by email and compare passwords
  User.findByEmailAndPassword(email, password, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Error logging in", error: err }); // Send the error back to the client
    }

    if (user) {
      // Generate a JWT token, making sure to reference user_id
      const token = jwt.sign(
        { id: user.user_id, email: user.email, role: user.role }, // Ensure this matches your model
        process.env.JWT_SECRET
      );

      // Respond with the token and user role
      res.json({ token, role: user.role });
    } else {
      res.status(400).json({ message: "Invalid email or password." });
    }
  });
};

exports.logout = (req, res) => {
  // Since JWT is stateless, there's no server-side session to destroy
  // Instead, we can just inform the client to remove the token

  res.status(200).json({
    message: "Logout successful. Please remove the token from client storage.",
  });
};

// controller/users.controller.js
exports.getProfile = (req, res) => {
  const userId = req.user.id; // Extract userId from the token payload

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
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
      from: `"VanGO Rental Services" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        
            <div style="background-color: #003459; color: #fff; padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
            </div>

            <div style="padding: 20px;">
                <p style="font-size: 16px; margin: 10px 0;">Dear ${
                  user.first_name
                } ${user.last_name},</p>
                <p style="font-size: 16px; margin: 10px 0;">We received a request to reset your password. Click the link below to reset your password:</p>

                <p style="font-size: 16px; margin: 10px 0;">
                    <a href="${resetLink}" style="background-color: #007BFF; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                </p>

                <p style="font-size: 16px; margin: 10px 0;">If you did not request a password reset, please ignore this email.</p>
            </div>

            <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
                <p>If you have any questions, please <a href="mailto:jerlonabayon16@gmail.com" style="color: #007BFF; text-decoration: none;">contact us</a>.</p>
                <p>&copy; ${new Date().getFullYear()} VanGO Rental Services. All rights reserved.</p>
            </div>

        </div>
    `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error sending email", details: error });
      }
      return res
        .status(200)
        .send({ message: "Password reset email sent successfully" });
    });
  });
};

exports.changePassword = (req, res) => {
  const { token, newPassword } = req.body;

  // Validate input
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required." });
  }

  // Verify the reset token and extract user ID
  const userId = verifyResetToken(token); // Implement this function to decode the token and get userId

  if (!userId) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }

  // Hash the new password
  bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing new password:", err);
      return res.status(500).send({ message: "Error hashing new password" });
    }

    // Update the user's password in the database
    User.updatePassword(userId, hashedPassword, (err) => {
      // Implement this method in your User model
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).send({ message: "Error updating password" });
      }

      res.status(200).send({ message: "Password changed successfully" });
    });
  });
};

exports.getDriver = async function (req, res) {
  const userId = req.params.userId; // Assuming userId is passed as a URL parameter

  try {
    // Fetch user details
    const user = await new Promise((resolve, reject) => {
      User.findById(userId, (err, user) => {
        if (err) {
          console.error("Error fetching user:");
          return reject(err);
        }
        resolve(user);
      });
    });

    // Fetch driver details
    const driver = await new Promise((resolve, reject) => {
      Driver.getDriverByUserId(userId, (err, driver) => {
        if (err) {
          console.error("Error fetching driver:", err);
          return reject(err);
        }
        resolve(driver);
      });
    });

    if (!driver) {
      return res.status(404).send({
        error: true,
        message: "Driver not found",
      });
    }

    res.status(200).send({
      error: false,
      user,
      driver,
    });
  } catch (error) {
    console.error("Error during fetching driver:", error);
    res.status(500).send({
      error: true,
      message: "Error fetching user and driver details",
    });
  }
};

exports.setNewPassword = async (req, res) => {
  const userId = req.user.id; // Extract userId from the token payload
  const { newPassword } = req.body;

  // Validate input
  if (!newPassword) {
    return res.status(400).json({ message: "New password is required." });
  }

  try {
    // Update the user's password in the database
    await new Promise((resolve, reject) => {
      User.setNewPassword(userId, newPassword, (err) => {
        if (err) {
          console.error("Error updating password:", err);
          return reject(err);
        }
        resolve();
      });
    });

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during password update:", error);
    res.status(500).send({ message: "Error updating password" });
  }
};

exports.countRegisteredDrivers = (req, res) => {
  User.countRegisteredDrivers((err, count) => {
    if (err) {
      console.error("Error counting registered drivers:", err);
      return res
        .status(500)
        .send({ error: true, message: "Error counting registered drivers" });
    }
    res.status(200).send({ error: false, count });
  });
};
