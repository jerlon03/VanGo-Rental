const Posts = require("../model/posts.model"); // Correct path to your model module

exports.createPost = (req, res) => {
  const { title, description, status, admin_id } = req.body;
  const imagePath = req.file ? req.file.path : null; // Ensure imagePath is set correctly

  // Validate required fields
  if (typeof title !== "string" || !title.trim() || !admin_id) {
    return res.status(400).json({
      message: "Title and admin_id are required fields",
    });
  }
  if (typeof description !== "string" || !description.trim()) {
    return res.status(400).json({
      message: "Description is a required field",
    });
  }
  if (typeof status !== "string" || !status.trim()) {
    return res.status(400).json({
      message: "Status is a required field",
    });
  }
  // Check if imagePath is null
  if (!imagePath) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Create a new Post instance
  const newPost = {
    title,
    description,
    post_image: imagePath,
    status,
    admin_id,
  };

  // Save the Post object to the database
  Posts.createPost(newPost, (err, postId) => {
    if (err) {
      console.error("Failed to create post:", err);
      return res.status(500).json({
        message: "Error creating post",
        error: err.message,
      });
    }
    res.status(201).json({
      message: "Post created successfully",
      postId: postId,
    });
  });
};

exports.updatePost = (req, res) => {
  console.log("Request Body:", req.body); // Log the request body for debugging
  const postId = req.params.id;
  const { title, description, status } = req.body; // Removed post_image from here

  // Create an object to hold the fields to update
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (req.file) updates.post_image = req.file.path; // Use the file path from multer
  if (status !== undefined) updates.status = status.trim(); // Trim whitespace

  console.log("Status Value:", updates.status); // Log the status value

  // Call the database update function with the updates object
  Posts.updatePost(postId, updates, (err, affectedRows) => {
    if (err) {
      if (err.message === "Post not found") {
        return res.status(404).json({
          message: "Post not found",
          error: err.message,
        });
      }
      return res.status(500).json({
        message: "Error updating post",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Post updated successfully",
      affectedRows: affectedRows,
    });
  });
};
exports.getAllPosts = (req, res) => {
  Posts.getAllPosts((err, posts) => {
    if (err) {
      return res.status(500).json({
        message: "Error retrieving posts",
        error: err.message,
      });
    }
    res.status(200).json({
      message: "Posts retrieved successfully",
      posts: posts,
    });
  });
};
exports.getPostById = (req, res) => {
  const postId = req.params.id;

  Posts.getPostById(postId, (err, post) => {
    if (err) {
      if (err.message === "Post not found") {
        return res.status(404).json({
          message: "Post not found",
          error: err.message,
        });
      }
      return res.status(500).json({
        message: "Error retrieving post",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Post retrieved successfully",
      post: post,
    });
  });
};

exports.getPublishedPostCount = (req, res) => {
  Posts.getPublishedPostCount((err, count) => {
    if (err) {
      return res.status(500).json({
        message: "Error retrieving published post count",
        error: err.message,
      });
    }
    res.status(200).json({
      message: "Published post count retrieved successfully",
      count: count,
    });
  });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id; // Get the post ID from the request parameters

  // Call the database delete function
  Posts.deletePost(postId, (err, affectedRows) => {
    if (err) {
      if (err.message === "Post not found") {
        return res.status(404).json({
          message: "Post not found",
          error: err.message,
        });
      }
      return res.status(500).json({
        message: "Error deleting post",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
      affectedRows: affectedRows,
    });
  });
};
