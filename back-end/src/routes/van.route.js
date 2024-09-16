const express = require('express');
const router = express.Router();
const vanController = require('../controllers/van.controller');

// Example protected route
router.post('/create', vanController.createVan);
router.get('/', vanController.getAllVans);

module.exports = router;
