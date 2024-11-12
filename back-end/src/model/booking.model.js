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
    const { 
        first_name, 
        last_name, 
        email, 
        phone_number, 
        date_of_birth, 
        pickup_location, 
        city_or_municipality, 
        pickup_date_time, 
        barangay, 
        proof_of_payment, 
        van_id 
    } = data;

    // SQL query to insert booking data
    const query = `
        INSERT INTO bookings (
            first_name, 
            last_name, 
            email, 
            phone_number, 
            date_of_birth, 
            pickup_location, 
            city_or_municipality, 
            pickup_date_time, 
            barangay, 
            proof_of_payment, 
            van_id,
            status
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    // Execute the query
    dbConn.query(query, [
        first_name, 
        last_name, 
        email, 
        phone_number, 
        date_of_birth, 
        pickup_location, 
        city_or_municipality, 
        pickup_date_time, 
        barangay, 
        proof_of_payment,
        van_id
    ], (err, result) => {
        if (err) {
            console.error('Database Error:', err); // Log the error for debugging
            return callback(err, null);
        }

        // Update the van status to 'booked'
        const updateVanStatusQuery = `UPDATE van SET status = 'booked' WHERE van_id = ?`;
        dbConn.query(updateVanStatusQuery, [van_id], (updateErr) => {
            if (updateErr) {
                console.error('Error updating van status:', updateErr);
                return callback(updateErr, null);
            }
            callback(null, result.insertId); // Return the inserted booking ID
        });
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

const updateBookingStatus = (bookingId, status, callback) => {
    const query = `UPDATE bookings SET status = ? WHERE booking_id = ?`;

    dbConn.query(query, [status, bookingId], (err, result) => {
        if (err) {
            console.error('Error updating booking status:', err);
            return callback(err, null);
        }
        
        if (result.affectedRows === 0) {
            return callback(new Error('Booking not found'), null);
        }
        
        callback(null, { message: 'Booking status updated successfully' });
    });
};

const getBookingsByVanId = (vanId, callback) => {
    const query = `
        SELECT * FROM bookings 
        WHERE van_id = ?
        ORDER BY pickup_date_time DESC`;

    dbConn.query(query, [vanId], (err, results) => {
        if (err) {
            console.error('Error fetching bookings by van ID:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    checkUserExists,
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    getBookingsByVanId
};
