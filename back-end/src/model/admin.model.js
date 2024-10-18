const dbConn = require('../../config/db.config');

const getAdminById = (adminId, callback) => {
    const query = 'SELECT admin_id, user_id, permissions FROM admins WHERE admin_id = ? ';

    dbConn.query(query, [adminId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // Check if an admin was found
        if (results.length === 0) {
            return callback(new Error('Admin not found'), null);
        }
        callback(null, results[0]); // Return the first matching admin
    });
};

const getAllAdmins = (callback) => {
    const query = 'SELECT admin_id, user_id, permissions FROM admins';

    dbConn.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results); // Return all matching admins
    });
};

module.exports = {
    getAdminById,
    getAllAdmins // Export the new function
};
