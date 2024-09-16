// src/controllers/booking.controller.js
const Booking = require('../model/booking.model');

const createBooking = (req, res) => {
    const { user_id, van_id, status } = req.body;

    if (!user_id || !van_id) {
        return res.status(400).send('user_id and van_id are required');
    }

    // Check if user exists before creating a booking
    Booking.checkUserExists(user_id, (err, userExists) => {
        if (err) {
            console.error('Error checking user existence:', err);
            return res.status(500).send('Internal server error');
        }

        if (!userExists) {
            return res.status(400).send('Invalid user_id');
        }

        // Proceed to create the booking
        Booking.createBooking(user_id, van_id, status, (err, bookingId) => {
            if (err) {
                console.error('Error creating booking:', err);
                return res.status(500).send('Error booking van');
            }
            res.status(201).send({ message: 'Van booked successfully!', bookingId });
        });
    });
};

const getBookings = (req, res) => {
    Booking.getBookingsWithDetails((err, bookings) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).json(bookings);
    });
};


module.exports = {
    createBooking,
    getBookings
};
