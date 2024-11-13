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

exports.getAllAdminUsers = function(req, res) {
    adminModel.getAllAdminUsers((err, adminUsers) => {
        if (err) {
            console.error('Error fetching all admin users:', err);
            return res.status(500).json({ 
                success: false,
                message: 'Server error', 
                error: err.message 
            });
        }

        if (!adminUsers || adminUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No admin users found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Admin users retrieved successfully',
            data: adminUsers
        });
    });
};

exports.updateAdminUser = function(req, res) {
    console.log('All params:', req.params);
    const user_id = req.params.userId;
    console.log('user_id:', user_id);
    
    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required'
        });
    }

    const adminData = {
        first_name: req.body.first_name?.trim(),
        last_name: req.body.last_name?.trim(),
        email: req.body.email?.trim(),
        phone_number: req.body.phone_number?.trim(),
        address: req.body.address?.trim()
    };

    if (adminData.first_name?.length > 11 || 
        adminData.last_name?.length > 11 || 
        adminData.email?.length > 63 || 
        adminData.phone_number?.length > 20 || 
        adminData.address?.length > 255) {
        return res.status(400).json({
            success: false,
            message: 'One or more fields exceed maximum length'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminData.email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    adminModel.updateAdminUser(user_id, adminData, (err, result) => {
        if (err) {
            console.error('Error updating admin user:', err);
            return res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.message
            });
        }

        if (!result.userResult.affectedRows && !result.adminResult.affectedRows) {
            return res.status(404).json({
                success: false,
                message: 'Admin user not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Admin user updated successfully',
            data: result
        });
    });
};
