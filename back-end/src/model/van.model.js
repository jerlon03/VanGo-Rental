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

Van.create = (newVan, result) => {
  dbConn.query("INSERT INTO van SET ?", newVan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created van: ", { id: res.insertId, ...newVan });
    result(null, { id: res.insertId, ...newVan });
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
