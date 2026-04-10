#  Books Catalog — SIT725 Task 5.2P

A minimal **Books Catalog** REST API with a simple browser client, built using the **MVC (Model-View-Controller)** architecture pattern.

**Author:** MUHAMMAD NOUMAN QAISER    
**Unit:** SIT725 — Practical Software Development  
**Task:** 5.2P — Using MVC Strategy  
**Stack:** Node.js + Express · Vanilla HTML / CSS / JS  

---

## Table of Contents

- [Project Overview](#project-overview)
- [MVC Architecture](#mvc-architecture)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Book Data](#book-data)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Client Interface](#client-interface)
- [Design Decisions](#design-decisions)

---

## Project Overview

This application implements a read-only Books catalog that:

- Serves book data via a RESTful JSON API built with **Express.js**
- Stores 5 books in an **in-memory array** (no database required)
- Follows a strict **MVC folder structure** matching the Week 5 prac example
- Provides a **vanilla HTML/CSS/JS** front-end client (no frameworks, no libraries)

---

## MVC Architecture

The application is divided into three distinct layers:

### Model (`models/` + `services/`)
Responsible for the application's data and business logic.

- `models/book.model.js` — Defines the `Book` class with all six fields: `id`, `title`, `author`, `year`, `genre`, `summary`.
- `services/books.service.js` — Holds the in-memory `books` array and exposes two data-access functions: `getAllBooks()` and `getBookById(id)`.

### View (`public/`)
Responsible for presenting data to the user.

- `public/index.html` — A single-page vanilla HTML/CSS/JS client that fetches `/api/books` on load and renders each book as an expandable card showing title and author.

### Controller (`controllers/` + `routes/`)
Acts as the intermediary between the Model and the View.

- `controllers/books.controller.js` — Handles incoming HTTP requests, calls the appropriate service function, and sends JSON responses (including `404` errors when a book is not found).
- `routes/books.routes.js` — Declares the two API routes and maps them to controller functions. Contains **no business logic**.

---

## Project Structure

```
5.1P/
│
├── server.js                        # App entry point — sets up Express, mounts routes
├── package.json                     # Project metadata and dependencies
│
├── models/
│   └── book.model.js                # Book class definition (data structure)
│
├── services/
│   └── books.service.js             # In-memory data store + data access methods
│
├── controllers/
│   └── books.controller.js          # HTTP request/response handling
│
├── routes/
│   └── books.routes.js              # Route declarations (no logic)
│
└── public/
    └── index.html                   # Browser client (vanilla HTML/CSS/JS)
```

---

## API Endpoints

| Method | Endpoint          | Description                          | Response         |
|--------|-------------------|--------------------------------------|------------------|
| GET    | `/api/books`      | Returns all books as a JSON array    | `200 OK`         |
| GET    | `/api/books/:id`  | Returns a single book by its `id`    | `200 OK` / `404` |

### Example — GET /api/books

```json
[
  {
    "id": "b1",
    "title": "The Three-Body Problem",
    "author": "Liu Cixin",
    "year": 2008,
    "genre": "Science Fiction",
    "summary": "..."
  },
  ...
]
```

### Example — GET /api/books/b2

```json
{
  "id": "b2",
  "title": "Jane Eyre",
  "author": "Charlotte Brontë",
  "year": 1847,
  "genre": "Classic",
  "summary": "An orphaned governess confronts class, morality, and love..."
}
```

### Example — GET /api/books/b99 (not found)

```json
{
  "error": "Book with id 'b99' not found."
}
```

---

## Book Data

The following five books are stored in `services/books.service.js`:

| ID  | Title                  | Author            | Year | Genre            |
|-----|------------------------|-------------------|------|------------------|
| b1  | The Three-Body Problem | Liu Cixin         | 2008 | Science Fiction  |
| b2  | Jane Eyre              | Charlotte Brontë  | 1847 | Classic          |
| b3  | Pride and Prejudice    | Jane Austen       | 1813 | Classic          |
| b4  | The English Patient    | Michael Ondaatje  | 1992 | Historical Fiction |
| b5  | Small Gods             | Terry Pratchett   | 1992 | Fantasy          |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes bundled with Node.js)

Verify your installation:

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd books-catalog
```

2. **Install dependencies**

```bash
npm install
```

This installs `express` as listed in `package.json`.

---

## Running the App

### Start the server

```bash
npm start
```

You should see:

```
Books catalog server running at http://localhost:3000
```

### Open the client

Open your browser and navigate to:

```
http://localhost:3000
```

### Test the API directly

```bash
# All books
curl http://localhost:3000/api/books

# Single book
curl http://localhost:3000/api/books/b1

# Not found
curl http://localhost:3000/api/books/b99
```

---

## Client Interface

The browser client (`public/index.html`) works as follows:

- On page load, it automatically calls `fetch('/api/books')`
- All books are rendered as cards showing **title** and **author**
- Clicking a card **expands it** to reveal the year, genre, and summary
- Clicking again **collapses** the card
- If the API call fails, an error message is displayed

---

## Design Decisions

- **No database** — data is stored in a plain JavaScript array in `books.service.js` as required by the task.
- **No frameworks on the client** — the front-end uses only vanilla HTML, CSS, and JavaScript as specified (no React, Vue, Bootstrap, Tailwind, etc.).
- **Routes contain no logic** — all business logic lives in the service layer; the controller handles only HTTP concerns.
- **404 handling** — `getBookById` returns `undefined` when no match is found; the controller catches this and responds with a meaningful `404` JSON error.
