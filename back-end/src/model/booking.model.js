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
const createBooking = (data, callback) => {
    const { first_name, last_name, email, phone_number, date_of_birth, drop_off_location, pickup_location, city_or_municipality, pickup_date_time, barangay, proof_of_payment, van_id } = data;
    
    const query = `
        INSERT INTO bookings (first_name, last_name, email, phone_number, date_of_birth, province, pickup_location, city_or_municipality, pickup_date_time, barangay, proof_of_payment, van_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbConn.query(query, [first_name, last_name, email, phone_number, date_of_birth, drop_off_location, pickup_location, city_or_municipality, pickup_date_time, barangay, proof_of_payment, van_id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result.insertId);
    });
};

const getAllBookings = (callback) => {
    const query = `SELECT * FROM bookings`;

    dbConn.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getBookingById = (bookingId, callback) => {
    const query = `SELECT * FROM bookings WHERE booking_id = ? LIMIT 1`;

    dbConn.query(query, [bookingId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // Check if a booking was found
        if (results.length === 0) {
            return callback(new Error('Booking not found'), null);
        }
        callback(null, results[0]);
    });
};

module.exports = {
    checkUserExists,
    createBooking,
    getAllBookings,
    getBookingById
};
