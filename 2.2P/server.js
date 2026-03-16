const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware for static files and JSON
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Basic calculator GET endpoint: /add?a=10&b=5
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Query params ?a=number&b=number required' });
  }
  res.json({ operation: 'add', a, b, result: a + b });
});

// Enhanced POST calculator: /calculate
app.post('/calculate', (req, res) => {
  const { operation = 'add', a, b } = req.body;
  if (!a || !b || isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Body: {operation: "add/subtract/multiply/divide", a: num, b: num}' });
  }
  
  let result;
  switch (operation.toLowerCase()) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': 
      result = b !== 0 ? a / b : 'Error: Division by zero';
      break;
    default: return res.status(400).json({ error: 'Invalid operation' });
  }
  res.json({ operation, a, b, result });
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SIT725 Task 2.2P Calculator API running!' });
});

app.listen(port, () => {
  console.log(` Server running: http://localhost:${port}`);
  console.log(` Webpage: http://localhost:${port}/index.html`);
  console.log(` Test GET: http://localhost:${port}/add?a=10&b=5`);
});
