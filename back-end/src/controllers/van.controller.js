const Van = require("../model/van.model");

exports.createVan = (req, res) => {
  const {
    van_name,
    van_description,
    people_capacity,
    transmission_type,
    things_capacity,
    driver_id,
    estimate_price,
  } = req.body; // Extract driver_id
  const imagePath = req.file?.path || null;

  if (!imagePath) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Create a new Van instance
  const newVan = new Van({
    van_name,
    van_description,
    van_image: imagePath,
    people_capacity,
    transmission_type,
    things_capacity,
    estimate_price: estimate_price || 0,
  });

  // Save the Van object to the database
  Van.create(newVan, driver_id, (err, data) => {
    if (err) {
      console.error("Failed to create van:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to create van" });
    }

    // Retrieve the van_id and driver_id from the created data
    const { id: van_id } = data; // Assuming data contains the created van's id
    const responseData = {
      status: "ok",
      data: {
        van_id,
        driver_id,
        ...data, // Include any other data returned from the create method
      },
    };

    res.status(201).json(responseData);
  });
};

// ... existing code ...

exports.updateVan = (req, res) => {
  const van_id = req.params.van_id; // Assuming the van_id is passed as a URL parameter
  const {
    van_name,
    van_description,
    people_capacity,
    transmission_type,
    things_capacity,
    status,
    estimate_price,
  } = req.body;
  const imagePath = req.file?.path; // Get the new image path if uploaded

  // Create an updated Van object
  const updatedVan = new Van({
    van_name,
    van_description,
    van_image: imagePath, // Use new image path or set to null if not provided
    people_capacity,
    transmission_type,
    things_capacity,
    status,
    estimate_price,
  });

  // Update the Van object in the database
  Van.update(van_id, updatedVan, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          status: "error",
          message: `Van with id ${van_id} not found.`,
        });
      }
      console.error("Failed to update van:", err);
      return res.status(500).send({
        status: "error",
        message: "Failed to update van",
      });
    }

    // Debugging statement to log the result of the update
    console.log("Update successful:", data);
    res.status(200).json({ status: "ok", data: data });
  });
};

exports.updateVanStatus = (req, res) => {
  const van_id = req.params.van_id; // Assuming the van_id is passed as a URL parameter
  const { status } = req.body.data; // Extract status from request body

  // Update the van status in the database
  Van.updateStatusById(van_id, status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          status: "error",
          message: `Van with id ${van_id} not found.`,
        });
      }
      console.error("Failed to update van status:", err);
      return res.status(500).send({
        status: "error",
        message: "Failed to update van status",
      });
    }

    // Check if the status was actually updated
    if (data.status === status) {
      return res
        .status(200)
        .json({ status: "ok", message: "Status updated successfully", data });
    } else {
      return res
        .status(200)
        .json({ status: "unchanged", message: "Status was unchanged", data });
    }
  });
};

// ... existing code ...

exports.getAllVans = (req, res) => {
  Van.getAll((err, vans) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: "An error occurred while retrieving vans",
      });
      return;
    }

    // Send a successful response with the list of vans
    res.status(200).send({
      status: "success",
      data: vans,
    });
  });
};

exports.getVanByID = (req, res) => {
  const van_id = req.params.van_id; // Assuming the van_id is passed as a URL parameter

  Van.getVanByID(van_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          status: "error",
          message: `Van with id ${van_id} not found.`,
        });
      }
      console.error("Failed to retrieve van:", err);
      return res.status(500).send({
        status: "error",
        message: "Failed to retrieve van",
      });
    }
    res.status(200).json({ status: "ok", data: data });
  });
};

exports.getCountByStatus = (req, res) => {
  Van.getCountByStatus((err, data) => {
    if (err) {
      console.error("Failed to retrieve van counts by status:", err);
      return res.status(500).send({
        status: "error",
        message: "Failed to retrieve van counts by status",
      });
    }
    res.status(200).json({ status: "ok", data: data });
  });
};

exports.getTotalVansCount = (req, res) => {
  Van.getCount((err, count) => {
    if (err) {
      console.error("Failed to retrieve total vans count:", err);
      return res.status(500).send({
        status: "error",
        message: "Failed to retrieve total vans count",
      });
    }
    res.status(200).json({ status: "ok", total_count: count });
  });
};

exports.deleteVan = (req, res) => {
  const van_id = req.params.van_id; // Assuming the van_id is passed as a URL parameter

  // Call the model's delete method
  Van.delete(van_id, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          status: "error",
          message: `Van with id ${van_id} not found.`,
        });
      }
      console.error("Failed to delete van:", err);
      return res.status(500).send({
        status: "error",
        message: "Failed to delete van",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "Van deleted successfully",
      driver_id: result.driver_id, // Optionally return the driver_id
    });
  });
};
