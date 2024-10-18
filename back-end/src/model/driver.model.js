const dbConn = require('../../config/db.config');

const updateUser = (userId, firstName, lastName, phoneNumber) => {
    return dbConn.query(`
        UPDATE users
        SET first_name = ?, last_name = ?, phoneNumber = ?
        WHERE user_id = ?
    `, [firstName, lastName, phoneNumber, userId]);
};

// Update driver profile
const updateDriver = (userId, phoneNumber, location, vehicleAssigned, experienceYears) => {
    return dbConn.query(`
        UPDATE drivers
        SET phoneNumber = ?, Location = ?, vehicle_assigned = ?, experience_years = ?
        WHERE user_id = ?
    `, [phoneNumber, location, vehicleAssigned, experienceYears, userId]);
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
    updateUser,
    updateDriver,
    getDriverProfile,
};