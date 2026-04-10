#  Books Catalog — SIT725 Task 5.3C

A **Books Catalog** REST API with MongoDB storage and a vanilla browser client, built using the **MVC (Model-View-Controller)** architecture pattern.

**Unit:** SIT725 — Practical Software Development  
**Task:** 5.3C — MVC + Database  
**Student Name:** MUHAMMAD NOUMAN QAISER    
**Student ID:** s224114075  
**Stack:** Node.js · Express · MongoDB · Mongoose · Vanilla HTML / CSS / JS

---

## Project Structure

```
5.3C/
│
├── server.js                        # Entry point — Express setup, MongoDB connection
├── seed.js                          # Database seeder — run once before starting
├── package.json
│
├── models/
│   └── book.model.js                # Mongoose schema (includes Decimal128 price)
│
├── services/
│   └── books.service.js             # Async DB query functions
│
├── controllers/
│   └── books.controller.js          # HTTP request/response handling
│
├── routes/
│   └── books.routes.js              # Route declarations (no logic)
│
└── public/
    └── index.html                   # Vanilla HTML/CSS/JS browser client
```

---

## MVC Architecture

### Model (`models/` + `services/`)
- `models/book.model.js` — Mongoose schema with fields `id`, `title`, `author`, `year`, `genre`, `summary`, `price` (Decimal128). A `toJSON` transform converts Decimal128 to a plain string for API responses.
- `services/books.service.js` — Async data-access functions (`getAllBooks`, `getBookById`) that query MongoDB. No hardcoded data.

### View (`public/`)
- `public/index.html` — Single-page vanilla client. Clicking **"Get all books"** fetches `/api/books` and renders a list. Clicking any item fetches `/api/books/:id` and shows the full detail panel.

### Controller (`controllers/` + `routes/`)
- `controllers/books.controller.js` — Handles `req`/`res`, calls service, returns JSON.
- `routes/books.routes.js` — Declares three routes with no business logic.

---

## API Endpoints

| Method | Endpoint                 | Description              | Response         |
|--------|--------------------------|--------------------------|------------------|
| GET    | `/api/books`             | Returns all books        | `200 OK`         |
| GET    | `/api/books/:id`         | Returns one book by id   | `200` / `404`    |
| GET    | `/api/integrity-check42` | Health check             | `204 No Content` |

---

## Book Data & Pricing

| ID  | Title                  | Author            | Year | Genre              | Price (AUD) |
|-----|------------------------|-------------------|------|--------------------|-------------|
| b1  | The Three-Body Problem | Liu Cixin         | 2008 | Science Fiction    | $29.99      |
| b2  | Jane Eyre              | Charlotte Brontë  | 1847 | Classic            | $22.00      |
| b3  | Pride and Prejudice    | Jane Austen       | 1813 | Classic            | $22.00      |
| b4  | The English Patient    | Michael Ondaatje  | 1992 | Historical Fiction | $25.39      |
| b5  | Small Gods             | Terry Pratchett   | 1992 | Fantasy            | $31.99      |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Make sure MongoDB is running
```bash
# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows — start MongoDB service from Services panel
```

### 3. Seed the database
```bash
node seed.js
```

### 4. Start the server
```bash
npm start
```

### 5. Open the app
Navigate to `http://localhost:3000`