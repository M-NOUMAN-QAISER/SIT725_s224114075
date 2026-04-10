const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

/**
 * Books Routes
 * Maps API endpoints to controller functions. No logic here.
 */

// GET /api/books  → getAllBooks
router.get('/books', booksController.getAllBooks);

// GET /api/books/:id  → getBookById
router.get('/books/:id', booksController.getBookById);

// GET /api/integrity-check42  → 204 No Content
router.get('/integrity-check42', (req, res) => {
  res.status(204).send();
});

module.exports = router;