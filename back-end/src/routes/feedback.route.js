const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

// Route to create a new feedback
router.post('/feedback', feedbackController.createFeedback);

// Route to get all feedbacks
router.get('/feedbacks', feedbackController.getAllFeedbacks);
router.put('/feedback/status', feedbackController.updateFeedbackStatus);
router.get('/feedback/count', feedbackController.countAllFeedback);


module.exports = router;
