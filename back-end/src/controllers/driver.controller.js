// const driverModel = require('../model/driver.model');

// exports.updateProfile = function(req, res) {
//     const userId = req.params.userId; // Assuming userId is passed as a URL parameter
//     const driverData = req.body;

//     // Log the userId being used for the update
//     console.log('Updating driver for userId:', userId);

//     // Validate required fields
//     const requiredFields = ['license_number', 'experience_years', 'vehicle_assigned', 'phoneNumber', 'Location'];
//     for (const field of requiredFields) {
//         if (!driverData[field]) {
//             return res.status(400).send({
//                 error: true,
//                 message: `Please provide ${field}`
//             });
//         }
//     }

//     // Attempt to update the driver
//     driverModel.updateDriver(userId, driverData, (err, affectedRows) => {
//         if (err) {
//             console.error('Error updating driver:', err);
//             return res.status(500).send({
//                 error: true,
//                 message: 'Error updating driver profile'
//             });
//         }

//         // Log the number of affected rows
//         console.log('Number of affected rows:', affectedRows);

//         res.status(200).send({
//             error: false,
//             message: 'Driver profile updated successfully',
//             affectedRows: affectedRows
//         });
//     });
// };
