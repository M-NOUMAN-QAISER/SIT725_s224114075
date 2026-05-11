const Book = require('../models/book.model');

/**
 * Books Service
 * Provides async data-access methods that query MongoDB via the Book model.
 * No hardcoded sample data lives here — all data comes from the database.
 */

/**
 * Returns all books from the database.
 * @returns {Promise<Book[]>}
 */
const getAllBooks = async () => {
  return await Book.find({});
};

/**
 * Returns a single book by its custom 'id' field (e.g. 'b1', 'b2').
 * @param {string} id
 * @returns {Promise<Book|null>}
 */
const getBookById = async (id) => {
  return await Book.findOne({ id });
};

module.exports = { getAllBooks, getBookById };