const Posts = require('../model/posts.model'); // Correct path to your model module

exports.createPost = (req, res) => {
    const { title, description, post_image, status, user_id } = req.body;

    // Validate required fields
    if (!title || !user_id) {
        return res.status(400).json({
            message: 'Title and user_id are required fields'
        });
    }

    Posts.createPost(title, description, post_image, status, user_id, (err, postId) => {
        if (err) {
            return res.status(500).json({
                message: 'Error creating post',
                error: err.message
            });
        }
        res.status(201).json({
            message: 'Post created successfully',
            postId: postId
        });
    });
};

exports.updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, description, post_image, status } = req.body;

    // Create an object to hold the fields to update
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (post_image !== undefined) updates.post_image = post_image;
    if (status !== undefined) updates.status = status;

    // Call the database update function with the updates object
    Posts.updatePost(postId, updates, (err, affectedRows) => {
        if (err) {
            if (err.message === 'Post not found') {
                return res.status(404).json({
                    message: 'Post not found',
                    error: err.message
                });
            }
            return res.status(500).json({
                message: 'Error updating post',
                error: err.message
            });
        }

        res.status(200).json({
            message: 'Post updated successfully',
            affectedRows: affectedRows
        });
    });
};
exports.getAllPosts = (req, res) => {
    Posts.getAllPosts((err, posts) => {
        if (err) {
            return res.status(500).json({
                message: 'Error retrieving posts',
                error: err.message
            });
        }
        res.status(200).json({
            message: 'Posts retrieved successfully',
            posts: posts
        });
    });
};
exports.getPostById = (req, res) => {
    const postId = req.params.id;

    Posts.getPostById(postId, (err, post) => {
        if (err) {
            if (err.message === 'Post not found') {
                return res.status(404).json({
                    message: 'Post not found',
                    error: err.message
                });
            }
            return res.status(500).json({
                message: 'Error retrieving post',
                error: err.message
            });
        }

        res.status(200).json({
            message: 'Post retrieved successfully',
            post: post
        });
    });
};