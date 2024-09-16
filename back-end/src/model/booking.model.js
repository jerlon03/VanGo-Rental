// src/models/booking.model.js
const dbConn = require('../../config/db.config');

// Check if a user exists
const checkUserExists = (user_id, callback) => {
    // Assuming you have a database connection instance
    const query = 'SELECT COUNT(*) as count FROM users WHERE user_id = ?';
    dbConn.query(query, [user_id], (err, results) => {
        if (err) return callback(err, false);
        const userExists = results[0].count > 0;
        callback(null, userExists);
    });
};


// Create a booking
const createBooking = (user_id, van_id, status, callback) => {
    const query = `
        INSERT INTO bookings (user_id, van_id, status) 
        VALUES (?, ?, ?)
    `;
    
    dbConn.query(query, [user_id, van_id, status || 'pending'], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result.insertId);
    });
};

const getBookingsWithDetails = (callback) => {
    const query = `
        SELECT 
            b.book_id, 
            u.user_id, 
            u.first_name AS user_first_name, 
            u.last_name AS user_last_name, 
            v.van_id, 
            v.van_name, 
            v.van_image, 
            b.status, 
            b.createdAt
        FROM 
            bookings b
        JOIN 
            users u ON b.user_id = u.user_id
        JOIN 
            van v ON b.van_id = v.van_id;
    `;

    dbConn.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    checkUserExists,
    createBooking,
    getBookingsWithDetails
};
