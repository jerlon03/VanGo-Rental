const express = require('express');
const router = express.Router();
const vanController = require('../controllers/van.controller');
const { uploadVan } = require('../../middleware/multer');

// Example protected route
router.post('/create',uploadVan.single('image') ,vanController.createVan);
router.get('/', vanController.getAllVans);

module.exports = router;
