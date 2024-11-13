const paymentModel = require('../model/payment.model');

const getAllPayments = (req, res) => {
    paymentModel.getAllPayments((err, results) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Error retrieving payments",
                error: err
            });
            return;
        }
        res.status(200).send({
            success: true,
            data: results
        });
    });
};

const updatePayment = (req, res) => {
    const paymentId = req.params.paymentId;
    const adminId = req.params.adminId;
    const payment_name = req.body.payment_name;
    const payment_image = req.file ? req.file.path : null; // Get the Cloudinary URL

    if (!payment_name || !payment_image) {
        return res.status(400).json({
            success: 0,
            message: "Both payment_name and payment_image are required"
        });
    }

    paymentModel.updatePayment(paymentId, adminId, payment_name, payment_image, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Failed to update payment",
                error: err
            });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: "Payment not found or no changes made"
            });
        }

        return res.status(200).json({
            success: 1,
            message: "Payment updated successfully",
            affectedRows: results.affectedRows
        });
    });
};

module.exports = {
    getAllPayments,
    updatePayment
};