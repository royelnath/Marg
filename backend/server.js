const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load secrets from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Allows React to talk to this server
app.use(express.json()); // Allows the server to understand JSON data from React

// Routes
// Any request to /api/auth will be sent to your authRoutes file
app.use('/api/auth', require('./routes/authRoutes'));

// Basic test route to see if the server is alive
app.get('/', (req, res) => {
  res.send('Future Marg API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});