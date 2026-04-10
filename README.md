# 📚 Books Catalog — SIT725 Task 5.3C

A **Books Catalog** REST API with MongoDB storage and a vanilla browser client, built using the **MVC (Model-View-Controller)** architecture pattern.

**Unit:** SIT725 — Practical Software Development  
**Task:** 5.3C — MVC + Database  
**Stack:** Node.js · Express · MongoDB · Mongoose · Vanilla HTML / CSS / JS

---

## Table of Contents

- [Project Overview](#project-overview)
- [What's New vs 5.2P](#whats-new-vs-52p)
- [MVC Architecture](#mvc-architecture)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Book Data & Pricing](#book-data--pricing)
- [Getting Started](#getting-started)
- [Seeding the Database](#seeding-the-database)
- [Running the App](#running-the-app)
- [Client Interface](#client-interface)

---

## Project Overview

This application extends Task 5.2P by replacing the in-memory data store with a real **MongoDB** database. It:

- Stores book data in MongoDB with `price` as **Decimal128**
- Exposes a read-only RESTful JSON API via **Express.js**
- Seeds the database using a standalone `seed.js` script (no hardcoded data in app code)
- Renders books in a **vanilla HTML/CSS/JS** client with a button-triggered list and click-through detail panel

---

## What's New vs 5.2P

| Feature | 5.2P | 5.3C |
|---|---|---|
| Data storage | In-memory array | MongoDB database |
| Price field | ✗ | ✅ Decimal128 |
| seed.js script | ✗ | ✅ |
| Mongoose model | ✗ | ✅ |
| Integrity check route | ✗ | ✅ `GET /api/integrity-check42` |
| Client behaviour | Auto-loads on page open | Button-triggered fetch + click-through detail |

---

## MVC Architecture

### Model (`models/` + `services/`)
- `models/book.model.js` — Mongoose schema with fields: `id`, `title`, `author`, `year`, `genre`, `summary`, `price` (Decimal128). A `toJSON` transform converts Decimal128 to a plain string for API responses.
- `services/books.service.js` — Async data-access functions (`getAllBooks`, `getBookById`) that query MongoDB. No hardcoded data.

### View (`public/`)
- `public/index.html` — Single-page vanilla client. Clicking **"Get all books"** fetches `/api/books` and renders a list of `title + price`. Clicking any list item fetches `/api/books/:id` and displays the full detail panel.

### Controller (`controllers/` + `routes/`)
- `controllers/books.controller.js` — Handles `req`/`res`, calls service functions asynchronously, returns JSON with proper status codes.
- `routes/books.routes.js` — Declares three routes with no business logic.

---

## Project Structure

```
books-catalog-db/
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

## API Endpoints

| Method | Endpoint                  | Description                        | Response     |
|--------|---------------------------|------------------------------------|--------------|
| GET    | `/api/books`              | Returns all books as a JSON array  | `200 OK`     |
| GET    | `/api/books/:id`          | Returns a single book by `id`      | `200` / `404`|
| GET    | `/api/integrity-check42`  | Health/integrity check             | `204 No Content` |

### Example — GET /api/books/b1

```json
{
  "id": "b1",
  "title": "The Three-Body Problem",
  "author": "Liu Cixin",
  "year": 2008,
  "genre": "Science Fiction",
  "summary": "...",
  "price": "29.99"
}
```

---

## Book Data & Pricing

| ID  | Title                  | Author            | Year | Genre            | Price (AUD) |
|-----|------------------------|-------------------|------|------------------|-------------|
| b1  | The Three-Body Problem | Liu Cixin         | 2008 | Science Fiction  | $29.99      |
| b2  | Jane Eyre              | Charlotte Brontë  | 1847 | Classic          | $22.00      |
| b3  | Pride and Prejudice    | Jane Austen       | 1813 | Classic          | $22.00      |
| b4  | The English Patient    | Michael Ondaatje  | 1992 | Historical Fiction | $25.39    |
| b5  | Small Gods             | Terry Pratchett   | 1992 | Fantasy          | $31.99      |

Prices are stored as `Decimal128` in MongoDB and serialised as strings in API responses.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) Community Edition (running locally on port 27017)

Verify installations:

```bash
node -v
npm -v
mongod --version
```

### Installation

```bash
git clone <your-repo-url>
cd books-catalog-db
npm install
```

---

## Seeding the Database

Before starting the server for the first time, populate the database:

```bash
npm run seed
```

Expected output:

```
Connected to MongoDB: mongodb://127.0.0.1:27017/booksdb
Cleared existing books.
Seeded 5 books successfully:
  [b1] The Three-Body Problem — AUD 29.99
  [b2] Jane Eyre — AUD 22.00
  [b3] Pride and Prejudice — AUD 22.00
  [b4] The English Patient — AUD 25.39
  [b5] Small Gods — AUD 31.99
Disconnected from MongoDB.
```

---

## Running the App

```bash
npm start
```

Expected output:

```
Connected to MongoDB: mongodb://127.0.0.1:27017/booksdb
Books catalog server running at http://localhost:3000
```

Open `http://localhost:3000` in your browser.

---

## Client Interface

1. The page loads showing **"Books Catalogue developed by s1234567"** and a **"Get all books"** button.
2. Clicking the button calls `fetch('/api/books')` and renders each book as `Title Price AUD` in a list.
3. Clicking any list item calls `fetch('/api/books/:id')` and displays the full detail panel showing Title, Author, Year, Genre, Summary, and Price (AUD).
4. Only one book's details are shown at a time.