const express = require("express");
const router = express.Router();
const vanController = require("../controllers/van.controller");
const { uploadVan } = require("../../middleware/multer");

// Example protected route
router.post("/create", uploadVan.single("image"), vanController.createVan);
router.get("/", vanController.getAllVans);

// Route for updating a van
router.put(
  "/update/:van_id",
  uploadVan.single("image"),
  vanController.updateVan
);
router.get("/van/:van_id", vanController.getVanByID);
router.get("/vans/count-by-status", vanController.getCountByStatus);
router.put("/update-status/:van_id", vanController.updateVanStatus);
router.get("/vans/count", vanController.getTotalVansCount);

module.exports = router;
