const dbConn = require('../../config/db.config');

const createPost = (newPost, callback) => {
    const { title, description, post_image, status, admin_id } = newPost;

    const query = `
        INSERT INTO posts (title, description, post_image, status, admin_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    dbConn.query(query, [title, description || null, post_image || null, status || 'DRAFT', admin_id], (err, result) => {
        if (err) {
            console.error('Database query error:', err); // Log the error for debugging
            return callback(err, null);
        }
        callback(null, result.insertId);
    });
};

const updatePost = (id, updates, callback) => {
    // Create an array to hold the fields to update and their values
    const fields = [];
    const values = [];

    // Check which fields are provided and add them to the update array
    if (updates.title !== undefined) {
        fields.push('title = ?');
        values.push(updates.title);
    }
    if (updates.description !== undefined) {
        fields.push('description = ?');
        values.push(updates.description);
    }
    if (updates.post_image !== undefined) {
        fields.push('post_image = ?');
        values.push(updates.post_image);
    }
    if (updates.status !== undefined) {
        fields.push('status = ?');
        values.push(updates.status);
    }

    // If no fields are provided, return an error
    if (fields.length === 0) {
        return callback(new Error('No fields to update'), null);
    }

    // Construct the query
    const query = `
        UPDATE posts 
        SET ${fields.join(', ')} 
        WHERE post_id = ?
    `;

    // Add the post ID to the values array
    values.push(id);

    dbConn.query(query, values, (err, result) => {
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

const getPublishedPostCount = (callback) => {
    const query = 'SELECT COUNT(*) AS count FROM posts WHERE status = ?';
    
    dbConn.query(query, ['PUBLISH'], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0].count); // Return the count of published posts
    });
};

const deletePost = (id, callback) => {
    const query = 'DELETE FROM posts WHERE post_id = ?';

    dbConn.query(query, [id], (err, result) => {
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

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    getPublishedPostCount,
    deletePost
};



