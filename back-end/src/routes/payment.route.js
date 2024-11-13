const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const {uploadPayment} = require('../../middleware/multer')

// Get all payments
router.get('/payments', paymentController.getAllPayments);
router.put('/payments/:paymentId/admin/:adminId', uploadPayment.single('payment_image'), paymentController.updatePayment);

module.exports = router;