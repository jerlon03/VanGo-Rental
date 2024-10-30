const dbConn = require('../../config/db.config');


const createDriver = (driverData, callback) => {
    return dbConn.query(`
        INSERT INTO drivers (user_id)
        VALUES (?)
    `, [driverData.user_id], callback);
};

// Update driver profile
const updateDriver = (userId, driverData, callback) => {
    // Check if the driver exists before updating
    return dbConn.query(`SELECT * FROM drivers WHERE user_id = ?`, [userId], (err, results) => {
        if (err) {
            return callback(err); // Handle any errors that occur during the query
        }
        if (results.length === 0) {
            return callback(new Error('No driver found with the provided user_id')); // Handle case where no driver exists
        }

        // Proceed with the update if the driver exists
        return dbConn.query(`
            UPDATE drivers
            SET experience_years = ?, vehicle_assigned = ?, phoneNumber = ?, location = ?
            WHERE user_id = ?
        `, [driverData.experience_years, driverData.vehicle_assigned, driverData.phoneNumber, driverData.location, userId], (err, results) => { 
            if (err) {
                return callback(err); // Handle any errors that occur during the query
            }
            callback(null, results.affectedRows); // Return the number of affected rows
        });
    });
};

const getDriverProfile = (userId) => {
    return dbConn.query(`
        SELECT u.first_name, u.last_name, d.phoneNumber, d.Location, d.vehicle_assigned, d.experience_years
        FROM users u
        JOIN drivers d ON u.user_id = d.user_id
        WHERE u.user_id = ?
    `, [userId]);
};

module.exports = {
    updateDriver,
    getDriverProfile,
    createDriver
};