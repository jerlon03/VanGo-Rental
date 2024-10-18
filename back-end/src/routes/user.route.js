const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../../middleware/auth');

// Routes
router.get('/', userController.findAll);
router.post('/register',verifyToken, userController.create);
router.post('/login', userController.login);
router.post('/logout', userController.logout);



module.exports = router;
