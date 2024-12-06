const dbConn = require("../../config/db.config");

const getAllPayments = (callback) => {
  return dbConn.query(
    `
        SELECT * FROM payment_methods
    `,
    callback
  );
};

const updatePayment = (
  paymentId,
  adminId,
  paymentName,
  paymentImage,
  callback
) => {
  // Prepare the SQL query and parameters dynamically
  const updates = [];
  const params = [];

  if (paymentName !== undefined) {
    updates.push("payment_name = ?");
    params.push(paymentName);
  }

  if (paymentImage !== undefined) {
    // Only add payment_image to updates if it's not null
    if (paymentImage !== null) {
      updates.push("payment_image = ?");
      params.push(paymentImage);
    }
  }

  // Ensure at least one field is being updated
  if (updates.length === 0) {
    return callback(new Error("No fields to update"), null);
  }

  // Construct the final query
  const query = `
      UPDATE payment_methods 
      SET ${updates.join(", ")}
      WHERE payment_id = ? AND admin_id = ?
  `;
  params.push(paymentId, adminId);

  return dbConn.query(query, params, callback);
};

module.exports = {
  getAllPayments,
  updatePayment,
};
