const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../../middleware/auth");

// Routes
router.get("/", userController.findAll);
router.post("/register", verifyToken, userController.createDriver);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/forgot-password", userController.forgotPassword);
router.post("/change-password", userController.changePassword);
router.post("/set-new-password", verifyToken, userController.setNewPassword);
router.get(
  "/drivers/count",
  verifyToken,
  userController.countRegisteredDrivers
);

module.exports = router;
