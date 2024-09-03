const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Routes
router.get('/', userController.findAll);
router.post('/register', userController.create);
router.post('/login', userController.login)
router.post('/logout', userController.logout);


module.exports = router;
