const Driver = require('../model/driver.model')


exports.fetchAllDrivers = (req, res) => {
    Driver.getAllDrivers((err, drivers) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving drivers', error: err });
        }
        const formattedDrivers = drivers.map(driver => ({
            ...driver,
            full_name: `${driver.first_name} ${driver.last_name}`
        }));
        res.status(200).json({ data: formattedDrivers });
    });
};

exports.fetchDriverById = (req, res) => {
    const vanId = req.params.id; // Assuming the driver ID is passed as a URL parameter
    Driver.getDriverById(vanId, (err, driver) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving driver', error: err });
        }
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.status(200).json({ data: driver });
    });
};

// Controller to get all drivers with status not assigned
exports.getAllDriversWithStatusNotAssigned = (req, res) => {
    Driver.getAllDriversWithStatusNotAssigned((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Handle any errors
        }
        res.status(200).json(results); // Return the list of drivers
    });
};

