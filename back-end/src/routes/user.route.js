const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const authController = require('../controllers/auth.controller');
// const authMiddleware = require('../middlewares/auth.middleware');

// Routes
router.get('/', userController.findAll);
router.post('/', userController.create);


// router.post('/login', authController.login);

// Example protected route
// router.get('/profile', authMiddleware.verifyTokenMiddleware, (req, res) => {
//   // Access user information from req.user
//   res.json({ error: false, message: 'Access granted', user: req.user });
// });

module.exports = router;
