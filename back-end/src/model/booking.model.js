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
        van_id,
        booking_end_date
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
            status,
            booking_end_date
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
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
        van_id,
        booking_end_date
    ], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return callback(err, null);
        }

        // Just update the van reference without changing status
        const updateVanQuery = `UPDATE van SET van_id = ? WHERE van_id = ?`;
        dbConn.query(updateVanQuery, [van_id, van_id], (updateErr) => {
            if (updateErr) {
                console.error('Error updating van reference:', updateErr);
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

const getBookingById = (bookingId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM bookings WHERE booking_id = ?`;
        dbConn.query(query, [bookingId], (err, result) => {
            if (err) {
                console.error('Error fetching booking:', err);
                return reject(err);
            }
            if (result.length === 0) {
                return reject(new Error('Booking not found'));
            }
            resolve(result[0]); // Assuming you want the first booking
        });
    });
};

const updateBookingStatus = (bookingId, status) => {
    return new Promise((resolve, reject) => {
        getBookingById(bookingId) // Ensure this returns a promise
            .then(booking => {
                const query = `UPDATE bookings SET status = ? WHERE booking_id = ?`;
                dbConn.query(query, [status, bookingId], (err, result) => {
                    if (err) {
                        console.error('Error updating booking status:', err);
                        return reject(new Error('Failed to update booking status.'));
                    }
                    
                    if (result.affectedRows === 0) {
                        return reject(new Error('Booking not found'));
                    }
                    
                    resolve({ message: 'Booking status updated successfully' });
                });
            })
            .catch(err => {
                reject(err); // Pass error to the reject
            });
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

// Get counts of all booking statuses excluding declined
const getBookingStatusCounts = (callback) => {
    const query = `
        SELECT status, COUNT(*) AS count 
        FROM bookings 
        WHERE status != 'declined' 
        GROUP BY status
    `;

    dbConn.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching booking status counts:', err);
            return callback(err, null);
        }
        const statusCounts = results.reduce((acc, row) => {
            acc[row.status] = row.count;
            return acc;
        }, {});
        callback(null, statusCounts); // Return an object with counts for each status
    });
};

const getBookingStatusCountsByVan = (vanId, callback) => {
    const query = `
        SELECT status, COUNT(*) AS count 
        FROM bookings 
        WHERE van_id = ?
        GROUP BY status
    `;

    dbConn.query(query, [vanId], (err, results) => {
        if (err) {
            console.error('Error fetching booking status counts by van:', err);
            return callback(err, null);
        }
        const statusCounts = results.reduce((acc, row) => {
            acc[row.status] = row.count;
            return acc;
        }, {});
        callback(null, statusCounts); // Return an object with counts for each status
    });
};
const getBookById = (bookingId, callback) => {
    const query = `SELECT * FROM bookings WHERE booking_id = ?`;
    dbConn.query(query, [bookingId], (err, result) => {
        if (err) {
            console.error('Error fetching booking:', err);
            return callback(err, null);
        }
        if (result.length === 0) {
            return callback(new Error('Booking not found'), null);
        }
        callback(null, result[0]); // Return the first booking
    });
};


module.exports = {
    checkUserExists,getBookById,
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    getBookingsByVanId,
    getBookingStatusCounts,
    getBookingStatusCountsByVan
};
