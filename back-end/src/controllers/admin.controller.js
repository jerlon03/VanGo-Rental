const adminModel = require('../model/admin.model'); // Adjust the path as necessary

exports.getAdminById = function(req, res) {
    const adminId = req.params.id; // Get adminId from request parameters
    adminModel.getAdminById(adminId, (err, admin) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        return res.status(200).json(admin); // Return admin details if found
    });
};

exports.getAllAdmins = function(req, res) {
    adminModel.getAllAdmins((err, admins) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        return res.status(200).json(admins); // Return all admin details
    });
};

exports.getAdminByUserId = function(req, res) {
    const userId = req.params.userId; // Get userId from request parameters
    console.log('Received userId:', userId); // Log the userId
    adminModel.getAdminByUserId(userId, (err, admin) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        return res.status(200).json(admin); // Return admin details if found
    });
};
