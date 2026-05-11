# Books Catalogue — SIT725 Task 7.2P

A Node.js web application that provides a browsable catalogue of books, built with Express, MongoDB (Mongoose), and Socket.IO for real-time communication. The project follows an MVC architecture and demonstrates how sockets enable live, multi-user awareness features without page reloads.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Socket.IO Events](#socketio-events)
- [REST API](#rest-api)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Seeding the Database](#seeding-the-database)
- [Running Tests](#running-tests)
- [How the Real-Time Features Work](#how-the-real-time-features-work)

---

## Project Overview

The Books Catalogue app lets users browse a collection of books stored in MongoDB. This version adds Socket.IO so that multiple browser sessions share a live experience — each visitor can see how many others are browsing, who is viewing which book, and when the catalogue is refreshed. A new book added through the API instantly appears as a notification in all open browsers.

---

## Features

**Core (pre-existing)**
- Browse a catalogue of books fetched from a MongoDB database
- Click a book title to view its full details in a side panel
- MVC pattern — routes, controllers, services, and models are cleanly separated
- Mocha/Chai/Supertest automated tests with no database dependency

**Added — Socket.IO real-time layer**
- Live "X browsing" visitor counter shown in the header
- Named sessions — each visitor enters their name on arrival
- Live activity feed showing joins, leaves, catalogue refreshes, and book views
- Instant notification broadcast to all tabs when a new book is added via the API

---

## Project Structure

```
7.2P/
├── server.js                  # Express app + Socket.IO setup, socket event handlers
├── package.json               # Dependencies (express, mongoose, socket.io)
├── seed.js                    # One-off script to populate MongoDB with sample books
│
├── models/
│   └── book.model.js          # Mongoose schema for a Book document
│
├── controllers/
│   └── books.controller.js    # Request handlers; emits book:added socket event
│
├── services/
│   └── books.service.js       # Database queries (getAllBooks, getBookById, createBook)
│
├── routes/
│   └── books.routes.js        # Maps HTTP endpoints to controller functions
│
├── public/
│   └── index.html             # Frontend UI with Socket.IO client, join screen, activity feed
│
├── utils/
│   └── bookUtils.js           # Shared utility helpers
│
└── test/
    ├── api.test.js             # Integration tests for REST endpoints (no real DB needed)
    └── bookUtils.test.js       # Unit tests for utility functions
```

---

## Architecture

The app uses a layered MVC structure:

```
Browser (Socket.IO client + fetch)
        |
        | WebSocket (Socket.IO)   HTTP (REST)
        |
server.js  ─────────────────────── routes/books.routes.js
   |                                       |
   | manages socket events          controllers/books.controller.js
   | and active user state                 |
   |                               services/books.service.js
   |                                       |
   |                               models/book.model.js  ──── MongoDB
   |
   | io.emit() broadcasts to all connected clients
```

The Socket.IO server instance is stored on the Express app object (`app.set('io', io)`) so that controllers can access it via `req.app.get('io')` and broadcast events when REST actions occur — for example, broadcasting `book:added` after a successful `POST /api/books`.

---

## Socket.IO Events

### Events emitted by the client → received by the server

| Event | Payload | Description |
|---|---|---|
| `user:join` | `name` (string) | Sent when the visitor submits their name on the join screen |
| `catalogue:fetch` | *(none)* | Sent when the "Get all books" button is clicked |
| `book:view` | `bookTitle` (string) | Sent when a book is selected from the list |

### Events emitted by the server → received by all clients

| Event | Payload | Description |
|---|---|---|
| `users:update` | `[{ name }, ...]` | Broadcast whenever someone joins or leaves; used to update the visitor counter |
| `activity` | `{ type, message }` | Broadcast for any notable action (join, leave, fetch, view, added) |
| `book:added` | `{ title, author, message }` | Broadcast when a new book is created via `POST /api/books` |

The `activity` event's `type` field is one of: `join`, `leave`, `fetch`, `view`, or `added`. The frontend uses it to pick an appropriate icon for the activity feed entry.

---

## REST API

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Response |
|---|---|---|---|
| `GET` | `/api/books` | Returns all books in the catalogue | `200 OK` — array of book objects |
| `GET` | `/api/books/:id` | Returns a single book by its `id` field | `200 OK` or `404 Not Found` |
| `POST` | `/api/books` | Creates a new book and broadcasts `book:added` to all sockets | `201 Created` |
| `GET` | `/api/integrity-check42` | Health-check endpoint | `204 No Content` |

### Book object shape

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

`price` is stored as `Decimal128` in MongoDB and serialised as a two-decimal string in JSON responses.

---

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- **MongoDB** running locally on the default port (`27017`), or a MongoDB Atlas URI

---

## Installation

```bash
# 1. Clone or extract the project folder
cd 7.2P

# 2. Install dependencies (including socket.io)
npm install
```

---

## Running the App

```bash
npm start
```

The server starts at `http://localhost:3000`. Open that URL in two or more browser tabs to see the real-time features in action — each tab will show what the others are doing in the live activity feed.

To use a different port or a remote MongoDB:

```bash
PORT=4000 MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/booksdb npm start
```

---

## Seeding the Database

The seed script clears any existing books and inserts five sample titles:

```bash
npm run seed
```

The seeded books are: *The Three-Body Problem*, *Jane Eyre*, *Pride and Prejudice*, *The English Patient*, and *Small Gods*.

---

## Running Tests

```bash
npm test
```

The test suite uses Mocha, Chai, and Supertest. The Mongoose model is monkey-patched before the app loads, so **no running MongoDB instance is needed** to run the tests.

Tests cover:

- `GET /api/books` — returns 200 and an array with the expected fields
- `GET /api/books/:id` — returns 200 and the correct book for a valid id
- `GET /api/books/:id` — returns 404 for an id that does not exist
- `GET /api/books/:id` — returns 404 for a numeric id not in the catalogue (edge case)
- `GET /api/integrity-check42` — returns 204
- Unknown routes — return 404

---

## How the Real-Time Features Work

When a user opens the app, a Socket.IO WebSocket connection is established automatically. A join-name overlay is shown before the main UI becomes usable.

Once the user submits their name, the client emits `user:join`. The server registers the socket in an in-memory `activeUsers` map and broadcasts `users:update` to all clients so the visitor counter updates instantly across every open tab.

Every meaningful user action (clicking "Get all books", selecting a book title) emits a socket event to the server, which rebroadcasts it as an `activity` event carrying a human-readable message. Every connected browser receives this and appends a timestamped entry to its live activity feed — so visitors can see what others are doing in real time without any polling.

When a book is added via `POST /api/books` (e.g. from a REST client like Postman or curl), the controller retrieves the Socket.IO instance from `req.app.get('io')` and calls `io.emit('book:added', ...)`. All connected browsers receive this event and display it in their activity feed immediately.

On disconnect, the server removes the user from `activeUsers`, broadcasts the updated count, and logs a "left" activity entry.