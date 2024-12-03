require("dotenv").config();

const dbConn = require("mysql2").createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

// Handle errors
dbConn.on("error", (err) => {
  console.error("Database pool error:", err);
});

// Export the pool
module.exports = dbConn;
