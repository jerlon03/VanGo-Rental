const express = require('express');
const cors = require('cors');
const app = express();

const userRoute = require('./routes/user')
app.use('/user', userRoute);

console.log(userRoute);
app.use(cors());

// Define your routes
app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
