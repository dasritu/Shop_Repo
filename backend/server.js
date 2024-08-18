const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware

app.use(cors({
  origin: 'https://quiet-macaron-259e1b.netlify.app', // Your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());
app.use(express.json());

const machineRoutes = require('./routes/machines');
app.use('/api/machines', machineRoutes);

const billRoutes = require('./routes/billRouter');
app.use('/api/bills', billRoutes);

// Connect to MongoDB

const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

