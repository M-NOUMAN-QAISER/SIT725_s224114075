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
 
module.exports = router;
 