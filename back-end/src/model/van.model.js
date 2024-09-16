const dbConn = require('../../config/db.config');

const Van = function(van) {
  this.van_id = van.van_id;
  this.van_name = van.van_name;
  this.van_description = van.van_description;
  this.van_image = van.van_image;
  this.people_capacity = van.people_capacity;
  this.transmission_type = van.transmission_type;
  this.things_capacity = van.things_capacity;
};

Van.create = (newVan, result) => {
    // Validate van_name
    if (!newVan.van_name) {
        result({ message: "Van name is required" }, null);
        return;
    }

    const query = 'INSERT INTO van (van_name, van_description, van_image, people_capacity, transmission_type, things_capacity, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    dbConn.query(query, 
      [
        newVan.van_name,
        newVan.van_description || '',
        newVan.van_image || '',
        newVan.people_capacity || 0,
        newVan.transmission_type || '',
        newVan.things_capacity || 0,
        'available'  // Default status
      ], 
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
  
        console.log("Van created: ", { van_id: res.insertId, ...newVan, status: 'available' });
        result(null, { van_id: res.insertId, ...newVan, status: 'available' });
      });
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

    console.log("Vans: ", res);
    result(null, res);
  });
};

module.exports = Van;
