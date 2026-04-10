#  Setup & Submission Instructions — SIT725 Task 5.2P

Follow these steps carefully to set up, run, test, and submit your Books Catalog project.

---

## Step 1 — Prerequisites

Before you begin, confirm the following tools are installed on your machine.

### Check Node.js and npm

Open a terminal and run:

```bash
node -v
npm -v
```

You need **Node.js v14 or higher**. If not installed, download it from:  
👉 https://nodejs.org/

### Check Git

```bash
git --version
```

If Git is not installed, download it from:  
👉 https://git-scm.com/

---

## Step 2 — Project Setup

### Option A — Clone from your GitHub repo (if already pushed)

```bash
git clone https://github.com/<your-username>/books-catalog.git
cd 5.1P
npm install
```

### Option B — Set up from scratch

1. Create a new folder and move into it:

```bash
mkdir 5.1P
cd 5.1P
```

2. Copy all project files into the folder, maintaining this exact structure:

```
5.1p/
├── server.js
├── package.json
├── models/
│   └── book.model.js
├── services/
│   └── books.service.js
├── controllers/
│   └── books.controller.js
├── routes/
│   └── books.routes.js
└── public/
    └── index.html
```

3. Install dependencies:

```bash
npm install
```

---

## Step 3 — Run the Application

Start the server with:

```bash
npm start
```

Expected terminal output:

```
Books catalog server running at http://localhost:3000
```

> **Keep this terminal open** while the server is running. Press `Ctrl + C` to stop it.

---

## Step 4 — Test the Application

### Test the browser client

1. Open your web browser (Chrome recommended for screenshots)
2. Navigate to: `http://localhost:3000`
3. You should see a list of 5 book cards with title and author
4. Click any card to expand it and see the full summary

### Test the API endpoints

Open a **new terminal** (keep the server running) and run:

```bash
# Test 1 — Get all books (should return array of 5 books)
curl http://localhost:3000/api/books

# Test 2 — Get a single book by ID
curl http://localhost:3000/api/books/b1
curl http://localhost:3000/api/books/b3

# Test 3 — Test 404 for unknown ID
curl http://localhost:3000/api/books/b99
```

Alternatively, test in the browser by visiting:
- `http://localhost:3000/api/books`
- `http://localhost:3000/api/books/b1`
- `http://localhost:3000/api/books/b99`

---

## Step 5 — Take Screenshots (for submission evidence)

Capture the following screenshots and save them:

| # | What to screenshot | How |
|---|---|---|
| 1 | Terminal showing server started | `npm start` output |
| 2 | Browser — client homepage (`http://localhost:3000`) | All 5 book cards visible |
| 3 | Browser — expanded book card | Click a card to show summary |
| 4 | Browser — `/api/books` JSON response | Visit `http://localhost:3000/api/books` |
| 5 | Browser — `/api/books/b1` JSON response | Single book object |
| 6 | Browser — `/api/books/b99` 404 response | Error JSON message |
| 7 | Your GitHub repo page | Shows all files pushed |

> **Tip (Windows):** Press `Win + Shift + S` to snip a region.  
> **Tip (Mac):** Press `Cmd + Shift + 4` to capture a region.

---

## Step 6 — Push to GitHub

### First-time setup

If you haven't initialised a Git repo yet:

```bash
cd 5.1P

# Initialise git
git init

# Create a .gitignore to exclude node_modules
echo "node_modules/" > .gitignore

# Stage all files
git add .

# Make the first commit
git commit -m "Initial commit: SIT725 5.2P Books Catalog MVC"

# Link to your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/<your-username>/books-catalog.git

# Push to GitHub
git push -u origin main
```

### Subsequent pushes (if making changes)

```bash
git add .
git commit -m "Your descriptive commit message"
git push
```

### Verify the push

1. Go to `https://github.com/<your-username>/books-catalog`
2. Confirm all files are visible: `server.js`, `models/`, `services/`, `controllers/`, `routes/`, `public/`, `README.md`
3. The `node_modules/` folder should **not** appear (excluded by `.gitignore`)

---

## Step 7 — Verify by Cloning

To confirm your repo is correctly set up (as required by the task), do a fresh clone test:

```bash
# Move to a different location
cd ~
git clone https://github.com/<your-username>/books-catalog.git test-clone
cd test-clone
npm install
npm start
```

If the server starts and `http://localhost:3000` works — your submission is ready. 

---

## Step 8 — Prepare the OnTrack PDF Submission

Your PDF submission must include:

1. **Your GitHub repo link** — e.g. `https://github.com/<your-username>/5.1P`
2. **All screenshots** from Step 5 (numbered and labelled)
3. Optionally: a brief paragraph describing your MVC implementation

### Creating the PDF

**Option A — Google Docs / Microsoft Word**
- Paste your repo link and screenshots into a document
- Export / Save As PDF

**Option B — Direct PDF print**
- Open a blank document in your browser
- Paste content and screenshots
- Use `File → Print → Save as PDF`

---

## Troubleshooting

### Port 3000 already in use

```bash
# Find and kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows (Command Prompt):
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

Then run `npm start` again.

### `Cannot find module 'express'`

Dependencies were not installed. Run:

```bash
npm install
```

### Blank page or "Failed to fetch" in browser

- Make sure the server is still running (`npm start`)
- Make sure you are visiting `http://localhost:3000` (not `https://`)
- Check the terminal for any error messages

### `git push` rejected

Your local branch may be behind. Try:

```bash
git pull origin main --rebase
git push
```

---

## Quick Reference — File Responsibilities

| File | Layer | Responsibility |
|------|-------|----------------|
| `server.js` | App | Starts Express, mounts routes, serves static files |
| `models/book.model.js` | Model | Defines the `Book` data structure |
| `services/books.service.js` | Model | In-memory data store, `getAllBooks()`, `getBookById()` |
| `controllers/books.controller.js` | Controller | Handles `req`/`res`, calls service, returns JSON |
| `routes/books.routes.js` | Controller | Maps URLs to controller functions, no logic |
| `public/index.html` | View | Fetches API on load, renders books in the browser |

---

**Author** MUHAMMAD NOUMAN QAISER   
**Deakin University**