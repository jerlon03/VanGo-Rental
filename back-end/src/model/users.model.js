const dbConn = require('../../config/db.config');

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
User.create = (newUser, callback) => {
  dbConn.query('INSERT INTO users (first_name, last_name, email, password, phoneNumber, Location) VALUES (?, ?, ?, ?, ?, ?)', 
    [newUser.first_name, newUser.last_name, newUser.email, newUser.password , newUser.phoneNumber, newUser.Location], 
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.insertId);
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
    "SELECT * FROM users WHERE email = ? AND password = ?", 
    [email, password], 
    function(err, res) {
      if (err) {
        console.log("Error fetching user: ", err);
        result(err, null);
      } else if (res.length) {
        result(null, res[0]);
      } else {
        result({ message: 'Invalid email or password' }, null);
      }
    }
  );
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