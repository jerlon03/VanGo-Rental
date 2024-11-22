const FeedbackModel = require('../model/feedback.model');

// Create a new feedback
const createFeedback = (req, res) => {
    console.log('Request Body:', req.body);
    const { bookingId, fullName, email, overallExperience, suggestions, rating } = req.body;
    
    if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
    }

    const bookingIdInt = parseInt(bookingId, 10);
    FeedbackModel.createFeedback(bookingIdInt, fullName, email, overallExperience, suggestions, rating, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Feedback created successfully', data: result });
    });
};

// Get all feedbacks
const getAllFeedbacks = (req, res) => {
    FeedbackModel.getAllFeedbacks((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ data: results });
    });
};

// Update feedback status
const updateFeedbackStatus = (req, res) => {
    const { feedbackId, newStatus } = req.body;

    if (!feedbackId || !newStatus) {
        return res.status(400).json({ error: 'Feedback ID and new status are required' });
    }

    FeedbackModel.updateFeedbackStatus(feedbackId, newStatus, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ success: true, message: 'Feedback status updated successfully' });
    });
};

const countAllFeedback = (req, res) => {
    FeedbackModel.countAllFeedback((err, count) => {
        if (err) {
            return res.status(500).json({ error: true, message: 'Error counting feedback' });
        }
        res.status(200).json({ error: false, count });
    });
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    updateFeedbackStatus,
    countAllFeedback
};