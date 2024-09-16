// src/routes/booking.routes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// Route to create a booking
router.post('/create', bookingController.createBooking);
router.get('/',bookingController.getBookings)

module.exports = router;
