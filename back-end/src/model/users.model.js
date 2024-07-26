const dbConn = require('../../config/db.config');

const User = function(user) {
    this.user_id = user.user_id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || 'customer'; // Default role to 'customer'
  };

User.create = function(newUser, result) {
  dbConn.query("INSERT INTO users SET ?", newUser, function(err, res) {
    if (err) {
      console.log("Error inserting user: ", err);
      result(err, null);
    } else {
      console.log("User added successfully with ID: ", res.insertId);
      result(null, res.insertId);
    }
  });
};

User.findAll = function(result) {
    dbConn.query("SELECT * FROM users", function(err, res) {
      if (err) {
        console.log("Error fetching users: ", err);
        result(err, null);
      } else {
        console.log('Users: ', res);
        result(null, res);
      }
    });
};

User.findByEmailAndPassword = function(email, password, result) {
    dbConn.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], function(err, res) {
      if (err) {
        console.log("Error fetching user: ", err);
        result(err, null);
      } else if (res.length) {
        result(null, res[0]);
      } else {
        result({ message: 'Invalid email or password' }, null);
      }
    });
  };

module.exports = User;
