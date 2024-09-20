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
User.create = function(newUser, result) {
  dbConn.query("INSERT INTO users set ?", newUser, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("User created with id: ", res.insertId);
      console.log("Stored hashed password length: ", newUser.password.length);
      result(null, res.insertId);
    }
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






module.exports = User;
