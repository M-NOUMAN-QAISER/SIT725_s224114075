const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/books.routes');

const app = express();
const PORT = 3000;

// Hardcoded MongoDB URI — localhost, same DB name used in seed.js
const MONGO_URI = 'mongodb://127.0.0.1:27017/booksdb';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', bookRoutes);

// Connect to MongoDB then start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB:', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Books catalog server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;