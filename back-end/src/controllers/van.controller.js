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

// ... existing code ...

exports.updateVan = (req, res) => {
  const van_id = req.params.van_id; // Assuming the van_id is passed as a URL parameter
  const { van_name, van_description, people_capacity, transmission_type, things_capacity, status } = req.body;
  const imagePath = req.file?.path;

  // Create an updated Van object
  const updatedVan = new Van({
    van_name,
    van_description,
    van_image: imagePath || null, // Use existing image if not provided
    people_capacity,
    transmission_type,
    things_capacity,
    status,
  });

  // Update the Van object in the database
  Van.update(van_id, updatedVan, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          status: 'error',
          message: `Van with id ${van_id} not found.`,
        });
      }
      console.error('Failed to update van:', err);
      return res.status(500).send({
        status: 'error',
        message: 'Failed to update van',
      });
    }
    res.status(200).json({ status: 'ok', data: data });
  });
};

// ... existing code ...

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