// src/routes/booking.routes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// Route to create a booking
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
// router.put('/:id', bookingController.updateBooking);
// router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
