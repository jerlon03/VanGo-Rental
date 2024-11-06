// src/controllers/booking.controller.js
const Booking = require('../model/booking.model');

exports.createBooking = async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    console.log('Uploaded file:', req.file); // Log the uploaded file

    // Check if the file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'Proof of payment image is required.' });
    }

    // Get the URL of the uploaded image from Cloudinary
    const imagePath = req.file.path; // This should be the URL returned by Cloudinary

    // Set the proof_of_payment
    const bookingData = { ...req.body, proof_of_payment: imagePath }; // Combine body and image path

    console.log('Booking Data:', bookingData); // Log booking data to check if proof_of_payment is included

    Booking.createBooking(bookingData, (err, bookingId) => {
        if (err) {
            console.error('Database Error:', err); // Log the error
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

