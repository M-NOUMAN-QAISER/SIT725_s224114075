# SIT725 – Applied Software Engineering  
## Prac 3 – Books Library Web Application

**Student Name:** Muhammad Nouman Qaiser  
**Student ID:** 224114075  
**Unit:** SIT725 – Applied Software Engineering  
**Trimester:** T1 2026  

---

## Project Overview

This project is the updated practical solution for **SIT725 Prac 3**, built using **Node.js**, **Express.js**, **Materialize CSS**, and a simple **REST API**.

The application is based on the required practical architecture:
- Express server
- Materialize-based frontend
- Static file serving through the `public/` folder
- Client-side `fetch()` request to a GET REST endpoint
- Dynamic rendering of data into cards

Instead of the earlier calculator-based task, this project now uses a **Books Library** theme.

---

## Purpose of the Task

The purpose of this practical is to understand and apply:

- Express.js server setup
- Static file serving in Node.js
- REST API design
- GET, POST, PUT, and DELETE methods
- Client-server interaction using `fetch()`
- Dynamic UI rendering with Materialize CSS
- Better project structure for web applications

---

## Features

This application includes:

- A styled **Books Library** homepage
- Dynamic book cards loaded from the backend API
- **Add Book** functionality
- **Update Book** functionality
- **Delete Book** functionality
- **Auto-generated ID** for each new book
- In-memory storage without using a database
- Materialize CSS design for a modern UI

> Note: Data is stored in memory only, so all added or updated books reset when the server restarts.

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Materialize CSS
- jQuery

### Backend
- Node.js
- Express.js
- REST API

### Version Control
- Git
- GitHub

---

## Project Structure

```text
3.2P/
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── public/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── scripts.js
    └── images/
        ├── book-icon.png
        ├── gatsby.jpg
        ├── 1984.jpg
        ├── pride.jpg
        └── tolkien.jpg
```

---

## How the Application Works

### Frontend
The frontend uses Materialize CSS to display a responsive Books Library interface.

It includes:
- Navbar
- Hero section
- Dynamic card grid
- Modal/forms for book actions
- Buttons for refreshing or managing books

### Backend
The backend runs on Express.js and:
- Serves static files from the `public/` folder
- Exposes REST API endpoints under `/api/books`
- Stores books in an in-memory JavaScript array
- Automatically assigns IDs to newly added books

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a single book by ID |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

---

## Sample Book Object

```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "image": "images/gatsby.jpg",
  "link": "Details",
  "description": "F. Scott Fitzgerald's Jazz Age masterpiece about wealth, love, and illusion."
}
```

---

## Running the Project

### 1. Clone the repository
```bash
git clone <your-repository-link>
```

### 2. Navigate into the project folder
```bash
cd 3.2P
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the server
```bash
npm start
```

Or run:
```bash
node server.js
```

### 5. Open in browser
```text
http://localhost:3000
```

---

## Testing the Application

### Test the website
Open:
```text
http://localhost:3000
```

### Test the API
Open:
```text
http://localhost:3000/api/books
```

### Example API Testing

#### GET all books
```http
GET /api/books
```

#### GET single book
```http
GET /api/books/1
```

#### POST add a new book
```json
POST /api/books
{
  "title": "New Book",
  "image": "images/newbook.jpg",
  "link": "Details",
  "description": "This is a new book description."
}
```

#### PUT update a book
```json
PUT /api/books/1
{
  "title": "Updated Book Title",
  "description": "Updated description"
}
```

#### DELETE a book
```http
DELETE /api/books/1
```

---

## Package Script

Make sure your `package.json` includes:

```json
"scripts": {
  "start": "node server.js"
}
```

---

## Key Improvements from the Old Task

Compared with the previous calculator-based Task 2.2P, this updated version now includes:

- A proper `public/` folder structure
- A real themed web application
- Materialize-based interface
- Dynamic cards loaded using `fetch()`
- REST API for books instead of calculator operations
- CRUD operations without a database
- Better UI and application structure for practical submission

---

## Git Commands Used

```bash
git add .
git commit -m "Updated project to SIT725 Prac 3 Books Library app"
git push
```

---

## Learning Outcomes

Through this project, the following concepts are demonstrated:

- Node.js and Express.js application setup
- REST API development
- Static web file serving
- Materialize CSS integration
- Dynamic frontend rendering with JavaScript
- CRUD operations in Express
- Basic full-stack web app structure
- Improved project organization

---

## Notes

- This project currently uses **in-memory storage only**
- No MongoDB or external database is used yet
- Any newly added or updated data will be lost after restarting the server
- Images should be placed inside the `public/images/` folder

---

## Author

**Muhammad Nouman Qaiser**  
- Master of Applied Artificial Intelligence  (Professional)
- Deakin University  
- Student ID: 224114075