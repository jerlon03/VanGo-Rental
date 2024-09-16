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