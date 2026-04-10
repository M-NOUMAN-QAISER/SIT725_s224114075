const booksService = require('../services/books.service');

/**
 * Books Controller
 * Handles HTTP requests and responses.
 * Delegates all data access to the books service.
 */

/**
 * GET /api/books
 * Returns all books as a JSON array.
 */
const getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books.', details: err.message });
  }
};

/**
 * GET /api/books/:id
 * Returns a single book by its id field, or 404 if not found.
 */
const getBookById = async (req, res) => {
  try {
    const book = await booksService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: `Book with id '${req.params.id}' not found.` });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve book.', details: err.message });
  }
};

module.exports = { getAllBooks, getBookById };