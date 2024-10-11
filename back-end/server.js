const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./config/db.config'); // Adjust path if necessary
const userRoute = require('./src/routes/user.route');
const authRoutes = require('./src/routes/auth.route')
const vanRoutes = require('./src/routes/van.route')
const bookingRoutes = require('./src/routes/booking.route')
const postingRoutes = require('./src/routes/posts.route')
const { verifyToken } = require('./middleware/auth');

const app = express();
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoute);

// private routes
app.use('/api', verifyToken, authRoutes);
app.use('/api/van',verifyToken, vanRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/posting',verifyToken, postingRoutes)

//public routes
app.use('/public/van', vanRoutes)
app.use('/public/posts', postingRoutes)
app.use('/public/booking',bookingRoutes )

// Catch-all route for undefined routes (404)
app.use('*', (req, res) => {
  console.log(`Attempted to access non-existent route: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: true, message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: true, message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
