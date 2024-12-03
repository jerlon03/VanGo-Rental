const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.controllers"); // Ensure this path is correct
const { uploadBlogPost } = require("../../middleware/multer");

// Ensure the key name matches what you use in FormData
router.post(
  "/create",
  uploadBlogPost.single("post_image"),
  postController.createPost
);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put(
  "/update/:id",
  uploadBlogPost.single("post_image"),
  postController.updatePost
);
router.delete("/:id", postController.deletePost);
router.get("/count/published", postController.getPublishedPostCount);

module.exports = router;
