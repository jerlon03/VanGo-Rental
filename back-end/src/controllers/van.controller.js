const Van = require('../model/van.model');
// const multer = require('multer')
// const cloudinary = require('../../utils/cloudinary')

exports.createVan = (req, res) => {
  const { van_name, van_description, people_capacity, transmission_type, things_capacity } = req.body;
  const imagePath = req.file?.path;

  if (!imagePath) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Create a new Van instance
  const newVan = new Van({
    van_name,
    van_description,
    van_image: imagePath,
    people_capacity,
    transmission_type,
    things_capacity,
  });

  // Save the Van object to the database
  Van.create(newVan, (err, data) => {
    if (err) {
      console.error('Failed to create van:', err);
      res.status(500).json({ status: 'error', message: 'Failed to create van' });
    } else {
      res.status(201).json({ status: 'ok', data: data });
    }
  });
};


//   // Validate request
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
//   const vanImage = req.file?.path;
//   // Create a Van object with default values for optional fields
//   const van = new Van({
//     van_name: req.body.van_name,  
//     van_description: req.body.van_description || "",
//     van_image: vanImage ,  
//     people_capacity: req.body.people_capacity || 0,
//     transmission_type: req.body.transmission_type || "",
//     things_capacity: req.body.things_capacity || 0
//   });

//   // Save Van in the database
//   Van.create(van, (err, data) => {
//     if (err) {
//       return res.status(500).send({
//         message: err.message || "Some error occurred while creating the Van."
//       });
//     }
//     res.send(data);
//   });
// };

exports.getAllVans = (req, res) => {
  Van.getAll((err, vans) => {
    if (err) {
      // Log the error and send a server error response
      console.error("Error retrieving vans: ", err);
      res.status(500).send({
        status: 'error',
        message: 'An error occurred while retrieving vans',
      });
      return;
    }

    // Send a successful response with the list of vans
    res.status(200).send({
      status: 'success',
      data: vans,
    });
  });
};