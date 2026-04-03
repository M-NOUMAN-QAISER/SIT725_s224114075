# 📚 Books Library — SIT725 Prac 4

**Student:** Muhammad Nouman Qaiser (224114075)
**Unit:** SIT725 Applied Software Engineering
**Task:** Prac 4 — Database Integration & Server-Side Functions

---

## What's New in Prac 4 (vs Prac 3)

| Feature | Prac 3 | Prac 4 |
|---------|--------|--------|
| Data Storage | In-memory array (lost on restart) | MongoDB (permanent) |
| Book Fields | title, image, link, description | + **author, genre, year, rating** |
| ID System | Manual `Math.max()` integer | MongoDB `ObjectId` (auto) |
| Add Book | ✅ POST | ✅ POST |
| Edit Book | ❌ | ✅ PUT |
| Delete Book | ✅ DELETE | ✅ DELETE |
| Search | ❌ | ✅ Title / Author / Genre |
| Filter by Genre | ❌ | ✅ Dropdown |
| Sort | ❌ | ✅ A-Z / Rating / Year |

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose ODM
- **Frontend:** Materialize CSS, jQuery, Vanilla JS

---

## How to Run

### 1. Start MongoDB (Docker)
```bash
docker run -d --name mongo-prac4 -p 27017:27017 mongo:latest
```

### 2. Install & Start
```bash
npm install
npm start
```

### 3. Open in Browser
```
http://localhost:3000
```

---

## REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Fetch all books |
| GET | `/api/books/:id` | Fetch single book |
| POST | `/api/books` | Add new book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

---

## Book Schema

```js
{
  title:       String (required),
  author:      String (required),
  genre:       String,
  year:        Number,
  rating:      Number (0–5),
  image:       String (URL),
  link:        String,
  description: String (required)
}
```
