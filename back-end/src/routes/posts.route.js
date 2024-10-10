const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controllers'); // Ensure this path is correct

router.post('/create', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);

module.exports = router;
