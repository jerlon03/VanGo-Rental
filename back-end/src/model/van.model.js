const dbConn = require("../../config/db.config");
const Driver = require("./driver.model");

const Van = function (van) {
  this.van_id = van.van_id;
  this.van_name = van.van_name;
  this.van_description = van.van_description;
  this.van_image = van.van_image;
  this.people_capacity = van.people_capacity;
  this.transmission_type = van.transmission_type;
  this.things_capacity = van.things_capacity;
  this.estimate_price = van.estimate_price;
  this.status = van.status || "available";
};

Van.create = (newVan, driver_id, result) => {
  // Step 1: Insert the new van into the van table
  dbConn.query("INSERT INTO van SET ?", newVan, (err, res) => {
    if (err) {
      return dbConn.rollback(() => {
        console.log("Error inserting van: ", err);
        result(err, null);
      });
    }
    console.log("Created van: ", { id: res.insertId, ...newVan });

    // Step 2: Automatically insert into driver_van table using the newly created van_id
    const driverVanInsertQuery =
      "INSERT INTO driver_van (driver_id, van_id) VALUES (?, ?)";
    dbConn.query(driverVanInsertQuery, [driver_id, res.insertId], (err) => {
      if (err) {
        return dbConn.rollback(() => {
          console.log("Error inserting into driver_van: ", err);
          result(err, null);
        });
      }
      console.log("Inserted into driver_van with van_id: ", res.insertId);

      // Step 3: Update the driver's status
      const driverUpdateQuery =
        "UPDATE drivers SET van_id = ?, status = 'assigned' WHERE driver_id = ?";
      dbConn.query(driverUpdateQuery, [res.insertId, driver_id], (err) => {
        if (err) {
          return dbConn.rollback(() => {
            console.log("Error updating drivers: ", err);
            result(err, null);
          });
        }
        console.log("Updated driver with van_id: ", res.insertId);
        result(null, { id: res.insertId, ...newVan });
      });
    });
  });
};

Van.update = (van_id, van, result) => {
  dbConn.query(
    "UPDATE van SET van_name = ?, van_description = ?, van_image = ?, people_capacity = ?, transmission_type = ?, things_capacity = ?, status = ? WHERE van_id = ?",
    [
      van.van_name,
      van.van_description,
      van.van_image,
      van.people_capacity,
      van.transmission_type,
      van.things_capacity,
      van.status,
      van_id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Van with the id not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated van: ", { van_id: van_id, ...van });
      result(null, { van_id: van_id, ...van });
    }
  );
};

Van.findById = (van_id, result) => {
  dbConn.query(`SELECT * FROM vans WHERE van_id = ${van_id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Van found: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Van with the id not found
    result({ kind: "not_found" }, null);
  });
};

Van.getAll = (result) => {
  dbConn.query("SELECT * FROM van", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Van.getVanByID = (van_id, result) => {
  dbConn.query(`SELECT * FROM van WHERE van_id = ?`, [van_id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Van found: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Van with the id not found
    result({ kind: "not_found" }, null);
  });
};

Van.getCountByStatus = (result) => {
  dbConn.query(
    "SELECT status, COUNT(*) AS status_count FROM van GROUP BY status",
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Van.updateStatusById = (van_id, status, result) => {
  dbConn.query(
    "UPDATE van SET status = ? WHERE van_id = ?",
    [status, van_id],
    (err, res) => {
      if (err) {
        console.log("Error updating status: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Van with the id not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated van status: ", { van_id: van_id, status: status });
      result(null, { van_id: van_id, status: status });
    }
  );
};

Van.getCount = (result) => {
  dbConn.query("SELECT COUNT(*) AS total_count FROM van", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0].total_count);
  });
};

Van.delete = (van_id, result) => {
  // First, find the driver associated with the van in the association table
  dbConn.query(
    "SELECT driver_id FROM driver_van WHERE van_id = ?",
    [van_id],
    (err, res) => {
      if (err) {
        console.log("Error retrieving driver association: ", err);
        result(err, null);
        return;
      }

      let driver_id = null; // Initialize driver_id
      if (res.length > 0) {
        driver_id = res[0].driver_id; // Get the associated driver_id
      }

      // Proceed to delete the association from the driver_van table
      dbConn.query(
        "DELETE FROM driver_van WHERE van_id = ?",
        [van_id],
        (err) => {
          if (err) {
            console.log("Error deleting driver association: ", err);
            result(err, null);
            return;
          }

          // Proceed to delete the van
          dbConn.query(
            "DELETE FROM van WHERE van_id = ?",
            [van_id],
            (err, res) => {
              if (err) {
                console.log("Error deleting van: ", err);
                result(err, null);
                return;
              }

              if (res.affectedRows == 0) {
                // Van with the id not found
                result({ kind: "not_found" }, null);
                return;
              }

              console.log("Deleted van with id: ", van_id);

              // If a driver was associated, update their status to 'not assigned'
              if (driver_id) {
                // Call the Driver model's method to update the driver's status
                Driver.updateDriverStatusToNotAssigned(driver_id, (err) => {
                  if (err) {
                    console.log("Error updating driver status: ", err);
                    // You may choose to handle this error differently
                  }
                });
              }

              result(null, { driver_id }); // Return the driver_id for further processing if needed
            }
          );
        }
      );
    }
  );
};

module.exports = Van;
