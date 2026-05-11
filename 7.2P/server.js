const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/books.routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/booksdb';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Make io accessible to route handlers via req.app.get('io')
app.set('io', io);

// Routes
app.use('/api', bookRoutes);

// Track connected users: socketId -> { name }
const activeUsers = {};

// Socket.IO real-time logic
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // New visitor joins — register with a name
  socket.on('user:join', (name) => {
    activeUsers[socket.id] = { name };
    io.emit('users:update', Object.values(activeUsers));
    io.emit('activity', { type: 'join', message: `${name} started browsing the catalogue` });
  });

  // Broadcast when a user fetches all books
  socket.on('catalogue:fetch', () => {
    const name = activeUsers[socket.id]?.name || 'Someone';
    io.emit('activity', { type: 'fetch', message: `${name} refreshed the book catalogue` });
  });

  // Broadcast when a user views a book detail
  socket.on('book:view', (bookTitle) => {
    const name = activeUsers[socket.id]?.name || 'Someone';
    io.emit('activity', {
      type: 'view',
      message: `${name} is viewing: "${bookTitle}"`,
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = activeUsers[socket.id];
    if (user) {
      delete activeUsers[socket.id];
      io.emit('users:update', Object.values(activeUsers));
      io.emit('activity', { type: 'leave', message: `${user.name} left the catalogue` });
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Only connect + listen when run directly (not when imported by tests)
if (require.main === module) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB:', MONGO_URI);
      server.listen(PORT, () => {
        console.log(`Books catalog server running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
}

module.exports = app;
