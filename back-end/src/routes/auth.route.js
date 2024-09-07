const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example protected route
router.get('/profile', userController.getProfile);

module.exports = router;
