const dbConn = require('../../config/db.config');

const createFeedback = (bookingId, fullName, email, overallExperience, suggestions, rating, callback) => {
    return dbConn.query(`
        INSERT INTO feedback (booking_id, full_name, email, overall_experience, suggestions, rating) 
        VALUES (?, ?, ?, ?, ?, ?)
    `, [bookingId, fullName, email, overallExperience, suggestions, rating], callback);
};

const getAllFeedbacks = (callback) => {
    return dbConn.query(`
        SELECT * FROM feedback
    `, callback);
};

const updateFeedbackStatus = (feedbackId, newStatus, callback) => {
    return dbConn.query(`
        UPDATE feedback 
        SET status = ? 
        WHERE feedback_id = ?
    `, [newStatus, feedbackId], callback);
};

const countAllFeedback = (callback) => {
    return dbConn.query(`SELECT COUNT(*) AS count FROM feedback`, (err, results) => {
        if (err) {
            return callback(err); // Handle any errors that occur during the query
        }
        callback(null, results[0].count); // Return the count of feedback
    });
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    updateFeedbackStatus,
    countAllFeedback
}