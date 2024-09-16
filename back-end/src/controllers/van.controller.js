const Van = require('../model/van.model');

exports.createVan = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Van object with default values for optional fields
  const van = new Van({
    van_name: req.body.van_name,  // This field is required
    van_description: req.body.van_description || "",
    van_image: req.body.van_image || "",
    people_capacity: req.body.people_capacity || 0,
    transmission_type: req.body.transmission_type || "",
    things_capacity: req.body.things_capacity || 0
  });

  // Save Van in the database
  Van.create(van, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Van."
      });
    } else {
      res.send(data);
    }
  });
};

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