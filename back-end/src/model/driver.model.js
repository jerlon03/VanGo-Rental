const dbConn = require("../../config/db.config");

const createDriver = (driverData, callback) => {
  return dbConn.query(
    `
        INSERT INTO drivers (user_id)
        VALUES (?)
    `,
    [driverData.user_id],
    callback
  );
};

// Update driver profile
const updateDriver = (userId, driverData, callback) => {
  // Check if the driver exists before updating
  return dbConn.query(
    `SELECT * FROM drivers WHERE user_id = ?`,
    [userId],
    (err, results) => {
      if (err) {
        return callback(err); // Handle any errors that occur during the query
      }
      if (results.length === 0) {
        return callback(new Error("No driver found with the provided user_id")); // Handle case where no driver exists
      }

      // Proceed with the update if the driver exists
      return dbConn.query(
        `
            UPDATE drivers
            SET experience_years = ?, phoneNumber = ?, location = ?
            WHERE user_id = ?
        `,
        [
          driverData.experience_years,
          driverData.phoneNumber,
          driverData.location,
          userId,
        ],
        (err, results) => {
          if (err) {
            return callback(err); // Handle any errors that occur during the query
          }
          callback(null, results.affectedRows); // Return the number of affected rows
        }
      );
    }
  );
};

// Get all drivers with user names
const getAllDrivers = (callback) => {
  return dbConn.query(
    `
        SELECT d.*, u.first_name, u.last_name
        FROM drivers d
        JOIN users u ON d.user_id = u.user_id
    `,
    (err, results) => {
      if (err) {
        return callback(err); // Handle any errors that occur during the query
      }
      callback(null, results); // Return the list of drivers with user names
    }
  );
};

const getDriverProfile = (userId) => {
  return dbConn.query(
    `
        SELECT u.first_name, u.last_name, d.phoneNumber, d.Location, d.vehicle_assigned, d.experience_years
        FROM users u
        JOIN drivers d ON u.user_id = d.user_id
        WHERE u.user_id = ?
    `,
    [userId]
  );
};

const getDriverByUserId = (userId, callback) => {
  return dbConn.query(
    `
        SELECT *
        FROM drivers
        WHERE user_id = ?
    `,
    [userId],
    (err, results) => {
      if (err) {
        return callback(err); // Handle any errors that occur during the query
      }
      if (results.length === 0) {
        console.error(`No driver found for user_id: ${userId}`); // Log the missing driver
        return callback(
          new Error(`No driver found with the provided user_id: ${userId}`)
        ); // More informative error
      }
      callback(null, results[0]); // Return the driver details
    }
  );
};

const getDriverById = (vanId, callback) => {
  return dbConn.query(
    `
        SELECT d.*, u.first_name, u.last_name, u.email
        FROM drivers d
        JOIN users u ON d.user_id = u.user_id
        WHERE d.van_id = ?
    `,
    [vanId],
    (err, results) => {
      if (err) {
        return callback(err); // Handle any errors that occur during the query
      }
      if (results.length === 0) {
        return callback(new Error("No driver found with the provided van_id")); // Handle case where no driver exists
      }
      callback(null, results[0]); // Return the driver details along with user info
    }
  );
};

// Get all drivers with status not assigned
const getAllDriversWithStatusNotAssigned = (callback) => {
  return dbConn.query(
    `
        SELECT d.*, u.first_name, u.last_name
        FROM drivers d
        JOIN users u ON d.user_id = u.user_id
        WHERE d.status = 'not assigned'
    `,
    (err, results) => {
      if (err) {
        return callback(err); // Handle any errors that occur during the query
      }
      callback(null, results); // Return the list of drivers with status not assigned
    }
  );
};

module.exports = {
  updateDriver,
  getDriverProfile,
  createDriver,
  getDriverByUserId,
  getAllDrivers,
  getDriverById,
  getAllDriversWithStatusNotAssigned,
};
