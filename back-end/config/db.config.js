require('dotenv').config();
const mysql = require('mysql');

const dbConn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

dbConn.connect(function(err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Database Connected");
});

module.exports = dbConn;
