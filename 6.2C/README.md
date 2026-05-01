# Books Catalog — SIT725 Task 6.2C (Testing)

A **Books Catalog** REST API with MongoDB storage and a vanilla browser client, built using the **MVC (Model-View-Controller)** architecture pattern — extended in Week 6 with a full automated test suite using **Mocha**, **Chai**, and **Supertest**.

**Unit:** SIT725 — Practical Software Development  
**Task:** 6.2C — TDD & Automated Testing  
**Student Name:** MUHAMMAD NOUMAN QAISER  
**Student ID:** s224114075  
**Stack:** Node.js · Express · MongoDB · Mongoose · Mocha · Chai · Supertest · Vanilla HTML / CSS / JS

---

## Project Structure

```
6.2C/
│
├── server.js                        # Entry point — Express setup, MongoDB connection
├── seed.js                          # Database seeder — run once before first start
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
├── utils/
│   └── bookUtils.js                 # Pure calculation functions (no DB dependency)
│
├── test/
│   ├── api.test.js                  # API integration tests (Mocha + Chai + Supertest)
│   └── bookUtils.test.js            # Unit tests for calculation functions
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

## Testing

### Tools
| Tool       | Role                                                      |
|------------|-----------------------------------------------------------|
| Mocha      | Test framework — runs all `test/*.test.js` files          |
| Chai       | Assertion library — `expect` style assertions             |
| Supertest  | HTTP assertions — tests Express routes without a real server port |

### Test files

#### `test/api.test.js` — REST API Integration Tests (7 tests)
Tests the Express routes end-to-end using Supertest. The Book model is stubbed so **no MongoDB connection is required**.

| # | Test | Type |
|---|------|------|
| 1 | `GET /api/books` returns HTTP 200 and an array | Valid |
| 2 | Every book item includes all expected fields | Valid |
| 3 | `GET /api/books/b1` returns the correct book | Valid |
| 4 | `GET /api/books/UNKNOWN` returns 404 | Error |
| 5 | `GET /api/books/99999` returns 404 | Edge case |
| 6 | `GET /api/integrity-check42` returns 204 | Valid |
| 7 | Unknown route returns 404 | Error |

#### `test/bookUtils.test.js` — Calculation Unit Tests (14 tests)
Tests the four pure functions in `utils/bookUtils.js` with no database or network needed.

| Function | Valid | Edge Case | Error |
|---|---|---|---|
| `calculateTotalPrice()` | ✔ | ✔ empty array, ✔ non-numeric price | ✔ non-array input |
| `calculateAveragePrice()` | ✔ | ✔ empty array, ✔ single book | — |
| `filterBooksByYearRange()` | ✔ | ✔ no match in range | ✔ non-array input |
| `applyDiscount()` | ✔ 10% discount | ✔ 0%, ✔ 100% discount | ✔ non-numeric input |

### Running the tests

```bash
npm test
```

> **No MongoDB connection required.** Tests run fully offline in ~40ms.

Expected output:
```
  Books Catalog REST API
    GET /api/books
      ✔ should return HTTP 200 and an array of books (valid behaviour)
      ✔ should include expected book fields in every item (valid behaviour)
    GET /api/books/:id
      ✔ should return HTTP 200 and the correct book for a valid id (valid behaviour)
      ✔ should return HTTP 404 for an id that does not exist (error behaviour)
      ✔ should return HTTP 404 for a numeric id that is not in the catalogue (edge case)
    GET /api/integrity-check42
      ✔ should return HTTP 204 No Content (valid behaviour)
    Unknown routes
      ✔ should return HTTP 404 for a completely unknown endpoint (error behaviour)

  Calculation Functions — bookUtils
    calculateTotalPrice()
      ✔ should return the correct total for a list of books (valid behaviour)
      ✔ should return 0 for an empty array (edge case)
      ✔ should return 0 when given a non-array (invalid/error behaviour)
      ✔ should ignore books with non-numeric prices (edge case)
    calculateAveragePrice()
      ✔ should return the correct average price (valid behaviour)
      ✔ should return 0 for an empty array (edge case)
      ✔ should return the price itself when there is only one book (edge case)
    filterBooksByYearRange()
      ✔ should return books within the specified year range (valid behaviour)
      ✔ should return an empty array when no books fall in range (edge case)
      ✔ should return an empty array for non-array input (invalid/error behaviour)
    applyDiscount()
      ✔ should correctly apply a 10% discount (valid behaviour)
      ✔ should return the original price for a 0% discount (edge case)
      ✔ should return 0 for a 100% discount (edge case)
      ✔ should return 0 for non-numeric inputs (invalid/error behaviour)

  21 passing (38ms)
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run the tests (no MongoDB needed)
```bash
npm test
```

### 3. Make sure MongoDB is running
```bash
# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows — start MongoDB service from Services panel
```

### 4. Seed the database
```bash
node seed.js
```

### 5. Start the server
```bash
npm start
```

### 6. Open the app
Navigate to `http://localhost:3000`

---

## Troubleshooting

**`EADDRINUSE: address already in use :::3000`**  
Another process is already on port 3000. Kill it then restart:
```powershell
# Windows — find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
npm start

# Or kill all Node processes
taskkill /IM node.exe /F
npm start
```