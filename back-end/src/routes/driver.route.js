const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
const { verifyToken } = require('../../middleware/auth');

// Define your routes
router.put('/:userId',verifyToken, userController.updateDriver); // Ensure this matches your controller function
// router.get('/drivers/:userId', userController.getDriverProfile); // Ensure this is defined in your controller

// Export the router
module.exports = router;