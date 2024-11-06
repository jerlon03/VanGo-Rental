const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Route to get admin by ID
router.get('/:id', adminController.getAdminById); 

// New route to get all admins
router.get('/', adminController.getAllAdmins); // Added route for getting all admins

// Route to get admin by user ID
router.get('/user/:userId', adminController.getAdminByUserId); // Added route for getting admin by user ID

module.exports = router;