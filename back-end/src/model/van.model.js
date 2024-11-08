const dbConn = require('../../config/db.config');

const Van = function(van) {
  this.van_id = van.van_id;
  this.van_name = van.van_name;
  this.van_description = van.van_description;
  this.van_image = van.van_image;
  this.people_capacity = van.people_capacity;
  this.transmission_type = van.transmission_type;
  this.things_capacity = van.things_capacity;
  this.status = van.status || 'available';
};

Van.create = (newVan, driver_id, result) => {
    dbConn.query("INSERT INTO van SET ?", newVan, (err, res) => {
      if (err) {
        return dbConn.rollback(() => {
          console.log("Error inserting van: ", err);
          result(err, null);
        });
      }
      console.log("Created van: ", { id: res.insertId, ...newVan });

      const driverUpdateQuery = "UPDATE drivers SET van_id = ?, status = 'assigned' WHERE driver_id = ?";
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
};

Van.update = (van_id, van, result) => {
  dbConn.query(
    "UPDATE van SET van_name = ?, van_description = ?, van_image = ?, people_capacity = ?, transmission_type = ?, things_capacity = ?, status = ? WHERE van_id = ?",
    [van.van_name, van.van_description, van.van_image, van.people_capacity, van.transmission_type, van.things_capacity, van.status, van_id],
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

module.exports = Van;
