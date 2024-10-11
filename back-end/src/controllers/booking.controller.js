// src/controllers/booking.controller.js
const Booking = require('../model/booking.model');

exports.createBooking = (req, res) => {
    const bookingData = req.body;

    Booking.createBooking(bookingData, (err, bookingId) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ bookingId });
    });
};

exports.getAllBookings = (req, res) => {
    Booking.getAllBookings((err, bookings) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(bookings);
    });
};

exports.getBookingById = (req, res) => {
    const bookingId = req.params.id;

    Booking.getBookingById(bookingId, (err, booking) => {
        if (err) {
            if (err.message === 'Booking not found') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(booking);
    });
}

