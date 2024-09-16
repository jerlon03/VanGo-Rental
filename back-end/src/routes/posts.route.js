const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controllers'); // Ensure this path is correct

router.post('/create', postController.createPost);
router.get('/', postController.getAllPosts);

module.exports = router;
