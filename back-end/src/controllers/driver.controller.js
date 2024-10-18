const driverModel = require('../model/driver.model');

exports.updateProfile = function(req, res) {
    const { userId, firstName, lastName, phoneNumber, location, vehicleAssigned, experienceYears } = req.body;

    if (!userId) {
        return res.status(400).send({ error: true, message: 'User ID is required.' });
    }

    // Update user profile
    driverModel.updateUser(userId, firstName, lastName, phoneNumber, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: true, message: 'Error updating user profile' });
        }

        // Update driver profile
        driverModel.updateDriver(userId, phoneNumber, location, vehicleAssigned, experienceYears, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: true, message: 'Error updating driver profile' });
            }

            res.status(200).send({ error: false, message: 'Profile updated successfully!' });
        });
    });
};


// Get profile
exports.getProfile = function(req, res) {
    const userId = req.user.user_id;

    driverModel.getDriverProfile(userId, (err, profile) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: true, message: 'Error fetching profile' });
        }

        res.status(200).send({ error: false, data: profile[0] }); // Assuming you return the first row
    });
};
