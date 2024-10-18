const express = require('express');
const driverController = require('../controllers/driver.controller');
const router = express.Router();


// Route to update driver profile
router.put('/profile/update',  driverController.updateProfile);

// Route to get driver profile
router.get('/profile', driverController.getProfile);

module.exports = router;
