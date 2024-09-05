const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./config/db.config'); // Adjust path if necessary
const userRoute = require('./src/routes/user.route');
// const authRoute = require('./src/routes/auth.route');  // Uncomment if needed

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
// app.use('/auth', authRoute);  // Uncomment if you have auth routes

// Catch-all route for undefined routes (404)
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: 'Route not found' });
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
