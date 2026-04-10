const booksService = require('../services/books.service');
 
/**
 * Books Controller
 * Handles HTTP requests and responses. Delegates business logic to the service.
 */
 
/**
 * GET /api/books
 * Returns all books.
 */
const getAllBooks = (req, res) => {
  const books = booksService.getAllBooks();
  res.status(200).json(books);
};
 
/**
 * GET /api/books/:id
 * Returns a single book by id, or 404 if not found.
 */
const getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: `Book with id '${req.params.id}' not found.` });
  }
  res.status(200).json(book);
};
 
module.exports = { getAllBooks, getBookById };
 