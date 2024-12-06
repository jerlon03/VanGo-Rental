const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/db.config"); // Adjust path if necessary
const userRoute = require("./src/routes/user.route");
const authRoutes = require("./src/routes/auth.route");
const vanRoutes = require("./src/routes/van.route");
const bookingRoutes = require("./src/routes/booking.route");
const postingRoutes = require("./src/routes/posts.route");
const driverRoutes = require("./src/routes/driver.route");
const adminRoutes = require("./src/routes/admin.route");
const paymentRoutes = require("./src//routes/payment.route");
const feedbackRoutes = require("./src/routes/feedback.route");
const { verifyToken } = require("./middleware/auth");
require("dotenv").config();

const app = express();
// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoute);

//public routes
app.use("/public/van", vanRoutes);
app.use("/public/posts", postingRoutes);
app.use("/public/booking", bookingRoutes);
app.use("/public/payment", paymentRoutes);
app.use("/public/feedback", feedbackRoutes);

// private routes
app.use(verifyToken);
app.use("/api/payment", paymentRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api", authRoutes);
app.use("/api/van", vanRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/posting", postingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

// Catch-all route for undefined routes (404)
app.use("*", (req, res) => {
  console.log(
    `Attempted to access non-existent route: ${req.method} ${req.originalUrl}`
  );
  res.status(404).json({ error: true, message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Log specific connection errors
  if (err.code === "ECONNRESET") {
    console.error("Connection reset error:", err);
    return res
      .status(500)
      .json({ error: true, message: "Connection reset error!" });
  }

  console.error("Error:", err.stack);
  res.status(500).json({ error: true, message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
