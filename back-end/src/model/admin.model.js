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

const getAdminByUserId = (userId, callback) => {
    const query = 'SELECT admin_id, user_id, permissions FROM admins WHERE user_id = ? ';

    dbConn.query(query, [userId], (err, results) => {
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
const getAllAdminUsers = (callback) => {
    const query = `
        SELECT 
            u.user_id,
            u.first_name,
            u.last_name,
            u.email,
            a.phone_number,
            a.address
        FROM users u
        JOIN admins a ON u.user_id = a.user_id`;

    dbConn.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const updateAdminUser = (user_id, adminData, callback) => {
    // First update the users table
    const userQuery = `
        UPDATE users 
        SET 
            first_name = ?,
            last_name = ?,
            email = ?
        WHERE user_id = ?`;

    dbConn.query(userQuery,
        [adminData.first_name, adminData.last_name, adminData.email, user_id],
        (err, userResult) => {
            if (err) {
                return callback(err, null);
            }

            // Then update the admins table
            const adminQuery = `
                UPDATE admins 
                SET 
                    phone_number = ?,
                    address = ?
                WHERE user_id = ?`;

            dbConn.query(adminQuery,
                [adminData.phone_number, adminData.address, user_id],
                (err, adminResult) => {
                    if (err) {
                        return callback(err, null);
                    }
                    callback(null, { userResult, adminResult });
                });
        });
};

module.exports = {
    getAdminById,
    getAdminByUserId,
    getAllAdmins,
    getAllAdminUsers,
    updateAdminUser
};
