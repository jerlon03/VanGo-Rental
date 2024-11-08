const express = require('express');
const router = express.Router();
const vanController = require('../controllers/van.controller');
const { uploadVan } = require('../../middleware/multer');

// Example protected route
router.post('/create',uploadVan.single('image') ,vanController.createVan);
router.get('/', vanController.getAllVans);

// Route for updating a van
router.put('/update/:van_id', uploadVan.single('image'), vanController.updateVan);
router.get('/van/:van_id', vanController.getVanByID);

module.exports = router;
