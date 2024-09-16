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

const getAllPosts = (callback) => {
    const query = 'SELECT * FROM posts';
    
    dbConn.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getAllPosts,
    createPost, // Ensure createPost is still exported
};



