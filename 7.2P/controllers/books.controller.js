const BookService = require('../services/books.service');

// GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const books = await BookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await BookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/books
const createBook = async (req, res) => {
  try {
    const book = await BookService.createBook(req.body);

    // Emit real-time event to all connected clients when a new book is added
    const io = req.app.get('io');
    if (io) {
      io.emit('book:added', {
        title: book.title,
        author: book.author,
        message: `New book added: "${book.title}" by ${book.author}`,
      });
    }

    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllBooks, getBookById, createBook };
