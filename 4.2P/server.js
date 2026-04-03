const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/booksLibraryDB');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB — booksLibraryDB');
  seedBooks();
});

// Mongoose Schema (different fields from prac template: added author, genre, year, rating)
const BookSchema = new mongoose.Schema({
  title:       { type: String, required: [true, 'Title is required'], trim: true },
  author:      { type: String, required: [true, 'Author is required'], trim: true },
  genre:       { type: String, default: 'Uncategorized', trim: true },
  year:        { type: Number, min: 1000, max: 2100 },
  rating:      { type: Number, min: 0, max: 5 },
  image:       { type: String, default: 'images/book-icon.png' },
  link:        { type: String, default: '#' },
  description: { type: String, required: [true, 'Description is required'], trim: true }
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);

// Auto-seed on first run
async function seedBooks() {
  const count = await Book.countDocuments();
  if (count > 0) return;
  const sampleBooks = [
    { title: 'The Great Gatsby',     author: 'F. Scott Fitzgerald', genre: 'Classic Fiction',   year: 1925, rating: 4.2, image: 'https://covers.openlibrary.org/b/id/8432460-L.jpg', link: '#', description: 'Jazz Age masterpiece about wealth, illusion, and the hollow American Dream.' },
    { title: '1984',                  author: 'George Orwell',        genre: 'Dystopian Fiction', year: 1949, rating: 4.7, image: 'https://covers.openlibrary.org/b/id/8575708-L.jpg', link: '#', description: 'George Orwell\'s chilling dystopian warning about totalitarianism and surveillance.' },
    { title: 'Pride & Prejudice',     author: 'Jane Austen',          genre: 'Romance',           year: 1813, rating: 4.5, image: 'https://covers.openlibrary.org/b/id/8739161-L.jpg', link: '#', description: 'Jane Austen\'s witty romance following Elizabeth Bennet and Mr. Darcy.' },
    { title: 'The Hobbit',            author: 'J.R.R. Tolkien',       genre: 'Fantasy',           year: 1937, rating: 4.6, image: 'https://covers.openlibrary.org/b/id/6979861-L.jpg', link: '#', description: 'Epic fantasy adventure following Bilbo Baggins to reclaim the Lonely Mountain.' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee',           genre: 'Literary Fiction',  year: 1960, rating: 4.8, image: 'https://covers.openlibrary.org/b/id/8228691-L.jpg', link: '#', description: 'Pulitzer Prize story of racial justice seen through Scout Finch\'s eyes.' },
    { title: 'Dune',                  author: 'Frank Herbert',        genre: 'Science Fiction',   year: 1965, rating: 4.4, image: 'https://covers.openlibrary.org/b/id/10971088-L.jpg', link: '#', description: 'Epic saga on the desert planet Arrakis, home to the precious spice melange.' }
  ];
  for (const b of sampleBooks) await new Book(b).save();
  console.log('Database seeded with ' + sampleBooks.length + ' books.');
}

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET: Fetch all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({}).sort({ title: 1 });
    res.json({ statusCode: 200, data: books, message: 'Success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, data: null, message: err.message });
  }
});

// GET: Fetch single book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ statusCode: 404, data: null, message: 'Book not found.' });
    res.json({ statusCode: 200, data: book, message: 'Success' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, data: null, message: err.message });
  }
});

// POST: Add a new book (Safe Write — allowlist fields)
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, genre, year, rating, image, link, description } = req.body;
    const book = new Book({ title, author, genre, year, rating, image, link, description });
    await book.save();
    res.status(201).json({ statusCode: 201, data: book, message: 'Book added successfully.' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, data: null, message: err.message });
  }
});

// PUT: Update a book (Safe Write — runValidators)
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, author, genre, year, rating, image, link, description } = req.body;
    const updated = await Book.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title, author, genre, year, rating, image, link, description } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ statusCode: 404, data: null, message: 'Book not found.' });
    res.json({ statusCode: 200, data: updated, message: 'Book updated successfully.' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, data: null, message: err.message });
  }
});

// DELETE: Remove a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ statusCode: 404, data: null, message: 'Book not found.' });
    res.json({ statusCode: 200, data: book, message: 'Book deleted successfully.' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, data: null, message: err.message });
  }
});

app.listen(port, () => {
  console.log('App listening on port: ' + port);
  console.log('API Test: http://localhost:' + port + '/api/books');
});
