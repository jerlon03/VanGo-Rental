// src/routes/booking.routes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { uploadReceipt } = require('../../middleware/multer');

// Route to create a booking
router.post('/', uploadReceipt.single('proof_of_payment'), bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
// router.put('/:id', bookingController.updateBooking);
// router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
