const dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');


const User = function(user) {
  this.user_id = user.user_id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.phoneNumber = user.phoneNumber;
  this.Location = user.Location;
  this.password = user.password;
  this.role = user.role || 'customer'; // Default role to 'customer'
};

// Assuming you have dbConn set up elsewhere in your code
User.create = function (userData, callback) {
  return dbConn.query(`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (?, ?, ?, ?)
  `, [userData.first_name, userData.last_name, userData.email, userData.password], (err, results) => {
      if (err) {
          return callback(err); // Handle any errors that occur during the query
      }
      // Return the ID of the newly created user
      callback(null, results.insertId); // This should correctly return the user ID
  });
};

User.update = function (userId, userData, callback) {
  return dbConn.query(`
      UPDATE users
      SET first_name = ?, last_name = ?, email = ?
      WHERE user_id = ?
  `, [userData.first_name, userData.last_name, userData.email, userId], (err, results) => {
      if (err) {
          return callback(err); // Handle any errors that occur during the query
      }
      // Optionally, you can return the number of affected rows
      callback(null, results.affectedRows); // This returns the number of rows affected by the update
  });
};


User.findAll = function(result) {
    dbConn.query("SELECT * FROM users", function(err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
};


User.findByEmailAndPassword = function(email, password, result) {
  dbConn.query(
    "SELECT * FROM users WHERE email = ?", 
    [email], 
    async function(err, res) {
      if (err) {
        console.log("Error fetching user: ", err);
        return result({ message: "Database error", details: err }, null);
      }

      if (res.length) {
        const user = res[0];
        console.log('User found:', email);
        console.log('Stored password hash length:', user.password.length);

        try {
          // Compare the hashed password with the provided one
          console.log('Attempting to compare passwords');
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log('Password match result:', passwordMatch);
          
          if (!passwordMatch) {
            console.log("Password mismatch for user:", email);
            return result({ message: 'Invalid email or password' }, null);
          } else {
            console.log('Login successful for user:', email);
            // Remove password before returning user object
            delete user.password;
            return result(null, user);
          }
        } catch (bcryptError) {
          console.log("Bcrypt comparison error:", bcryptError);
          return result({ message: "Error verifying password", details: bcryptError }, null);
        }
      } else {
        console.log("No user found with email:", email);
        return result({ message: 'Invalid email or password' }, null);
      }
    }
  );
};

User.verifyPassword = (plainPassword, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt comparison error:", err);
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

// model/users.model.js
User.findById = function(id, result) {
  dbConn.query('SELECT * FROM users WHERE user_id = ?', [id], function(err, res) {
    if (err) {
      console.error('Database error:', err);
      result(err, null);
    } else if (res.length) {
      result(null, res[0]);
    } else {
      result({ message: 'User not found' }, null);
    }
  });
};

User.getByEmail = function(email, result) {
  dbConn.query("SELECT * FROM users WHERE email = ?", [email], function(err, res) {
    if (err) {
      return result(err, null);
    } else if (res.length > 0) { // Check if any user was found
      return result(null, res[0]); // Return the first user found
    } else {
      return result(null, null); // Return null if no user found
    }
  });
};

User.setResetToken = function(email, token, expiration, result) {
  dbConn.query(
    "UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE email = ?",
    [token, expiration, email],
    function(err, res) {
      if (err) {
        console.error("Database error:", err);
        return result(err, null);
      }
      result(null, res);
    }
  );
};

User.clearResetToken = function(email, result) {
  dbConn.query(
    "UPDATE users SET reset_token = NULL, reset_token_expiration = NULL WHERE email = ?",
    [email],
    function(err, res) {
      if (err) {
        console.error("Database error:", err);
        return result(err, null);
      }
      result(null, res);
    }
  );
};

User.updatePassword = function(userId, newPassword, result) {
  dbConn.query(
    "UPDATE users SET password = ? WHERE user_id = ?",
    [newPassword, userId],
    function(err, res) {
      if (err) {
        console.error("Database error:", err);
        return result(err, null);
      }
      // Check if any rows were affected
      if (res.affectedRows === 0) {
        return result({ message: 'User not found' }, null);
      }
      result(null, res);
    }
  );
};






module.exports = User;
