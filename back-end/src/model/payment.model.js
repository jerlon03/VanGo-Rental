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
  return dbConn.query(
    `
        UPDATE payment_methods 
        SET payment_name = ?, payment_image = ?
        WHERE payment_id = ? AND admin_id = ?
    `,
    [paymentName, paymentImage, paymentId, adminId],
    callback
  );
};

module.exports = {
  getAllPayments,
  updatePayment,
};
