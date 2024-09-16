require('dotenv').config();
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Handle errors
pool.on('error', (err) => {
  console.error('Database pool error:', err);
});

// Export the pool
module.exports = pool;
