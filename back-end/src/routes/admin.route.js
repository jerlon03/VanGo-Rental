const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Route to get admin by ID
router.get('/:id', adminController.getAdminById); 

// New route to get all admins
router.get('/', adminController.getAllAdmins); // Added route for getting all admins

module.exports = router;
