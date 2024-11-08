const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
const DriverController = require('../controllers/driver.controller')
const { verifyToken } = require('../../middleware/auth');

// Define your routes
router.put('/:userId',verifyToken, userController.updateDriver); // Ensure this matches your controller function
router.get('/:userId', verifyToken, userController.getDriver);
router.get('/', verifyToken, DriverController.fetchAllDrivers );
router.get('/driver/:id', DriverController.fetchDriverById); // Route for fetching driver by ID
router.get('/drivers/not-assigned', DriverController.getAllDriversWithStatusNotAssigned);
// Export the router
module.exports = router;