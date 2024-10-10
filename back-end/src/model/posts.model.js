const dbConn = require('../../config/db.config');

const createPost = (title, description, post_image, status, user_id, callback) => {
    const query = `
        INSERT INTO posts (title, description, post_image, status, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    dbConn.query(query, [title, description || null, post_image || null, status || 'unpublish', user_id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result.insertId);
    });
};

const updatePost = (id, title, description, post_image, status, callback) => {
    const query = `
        UPDATE posts 
        SET title = ?, description = ?, post_image = ?, status = ? 
        WHERE post_id = ?
    `;

    dbConn.query(query, [title, description || null, post_image || null, status || 'unpublish', id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return callback(new Error('Post not found'), null);
        }
        callback(null, result.affectedRows); // Return the number of affected rows
    });
};

const getAllPosts = (callback) => {
    const query = 'SELECT * FROM posts';
    
    dbConn.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
// New function to get a post by ID
const getPostById = (id, callback) => {
    const query = 'SELECT * FROM posts WHERE post_id = ?';

    dbConn.query(query, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // Check if a post was found
        if (results.length === 0) {
            return callback(new Error('Post not found'), null);
        }
        callback(null, results[0]); // Return the first post
    });
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost 
};



