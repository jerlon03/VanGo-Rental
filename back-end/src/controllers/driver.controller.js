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