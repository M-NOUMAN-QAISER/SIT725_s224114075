const express = require('express');
const path = require('path');
const bookRoutes = require('./routes/books.routes');
 
const app = express();
const PORT = 3000;
 
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
 
// Routes
app.use('/api', bookRoutes);
 
// Start server
app.listen(PORT, () => {
  console.log(`Books catalog server running at http://localhost:${PORT}`);
});
 
module.exports = app;