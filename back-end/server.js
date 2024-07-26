const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConn = require('./config/db.config'); // Adjust path as necessary
const userRoute = require('./src/routes/user.route');
// const authRoute = require('./routes/auth.route');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoute);
// app.use('/auth', authRoute);


// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ error: true, message: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
