const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// In-memory data (Ready to be replaced with MongoDB later)
let books = [
  { id: 1, title: 'The Great Gatsby', image: 'images/gatsby.jpg', link: '#', description: 'Jazz Age masterpiece about wealth and illusion.' },
  { id: 2, title: '1984', image: 'images/1984.jpg', link: '#', description: 'George Orwell\'s dystopian warning.' },
  { id: 3, title: 'Pride & Prejudice', image: 'images/pride.jpg', link: '#', description: 'Jane Austen\'s witty romance.' },
  { id: 4, title: 'The Hobbit', image: 'images/tolkien.jpg', link: '#', description: 'Epic fantasy adventure.' }
];

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET: Fetch all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST: Add a new book (Auto-assign ID)
app.post('/api/books', (req, res) => {
  const { title, image, link, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const newBook = { id: newId, title, image: image || 'images/book-icon.png', link: link || '#', description };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE: Remove a book
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted', success: true });
});

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
  console.log(`API Test: http://localhost:${port}/api/books`);
});