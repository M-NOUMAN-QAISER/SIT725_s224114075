/*
  SIT725 Prac 4 — Books Library | scripts.js
  Muhammad Nouman Qaiser (224114075)
  ─────────────────────────────────────────────────────────────
  Updated from Prac 3 → Prac 4:
  ✅ loadBooks() now uses $.get and checks response.statusCode (prac pattern)
  ✅ saveBook() supports both POST (add) and PUT (edit)
  ✅ deleteBook() uses MongoDB _id instead of integer id
  ✅ Added genre filter, sort, search, stats
  ✅ Prac 3 demoForm preserved as required
*/

$(document).ready(function () {

  // Initialize Materialize Components
  M.AutoInit();

  // Load books on startup
  loadBooks();

  // Button Listeners
  $('#saveBookBtn').click(saveBook);
  $('#confirmDeleteBtn').click(confirmDelete);
  $('#searchInput').on('input', filterBooks);
  $('#genreFilter').on('change', filterBooks);
  $('#sortSelect').on('change', filterBooks);

  // Prac 3 Required Console Logging Form (preserved)
  $('#demoForm').on('submit', function (e) {
    e.preventDefault();
    const formData = {
      firstName: $('#firstName').val(),
      lastName:  $('#lastName').val(),
      email:     $('#email').val()
    };
    console.log('--- Prac 3 Demo Form Submitted ---');
    console.table(formData);
    M.toast({ html: 'Form Submitted! Check Console (F12)', classes: 'blue rounded' });
    M.Modal.getInstance($('#demoModal')[0]).close();
  });

  // Reset form when add modal opens
  $(document).on('click', 'a[href="#addBookModal"]', function () {
    if (!$(this).hasClass('edit-trigger')) {
      resetForm();
    }
  });

});

// ─── State ──────────────────────────────────────────────────
let allBooks = [];

// ═══════════════════════════════════════════════════════════
//  GET: Fetch Books (Prac 4 — $.get with statusCode check)
// ═══════════════════════════════════════════════════════════
function loadBooks() {
  $.get('/api/books', function (response) {
    if (response.statusCode === 200) {
      allBooks = response.data;
      populateGenreFilter(allBooks);
      filterBooks();
      updateStats(allBooks);
    } else {
      M.toast({ html: 'Error loading books: ' + response.message, classes: 'red rounded' });
    }
  }).fail(function () {
    M.toast({ html: 'Cannot connect to server.', classes: 'red rounded' });
    $('#emptyState').show();
    $('#emptyMsg').text('Cannot connect to server. Is it running?');
  });
}

// ─── Render book cards ───────────────────────────────────────
function renderBooks(books) {
  const grid = $('#books-grid');
  grid.empty();

  if (!books.length) {
    $('#emptyState').show();
    return;
  }
  $('#emptyState').hide();

  books.forEach(function (book) {
    const ratingStars = book.rating ? '★ ' + book.rating : '';
    const cardHtml = `
      <div class="col s12 m6 l4">
        <div class="card book-card">
          <div class="card-image">
            <img src="${book.image || 'images/book-icon.png'}"
                 alt="${book.title}"
                 onerror="this.src='https://via.placeholder.com/300x250?text=No+Cover'"
                 loading="lazy">
          </div>
          <div class="card-meta">
            <p class="card-author">by ${book.author || ''}</p>
            <p class="card-genre-year">${book.genre || 'General'} ${book.year ? '· ' + book.year : ''}</p>
            <p class="card-rating">${ratingStars}</p>
          </div>
          <div class="card-content">
            <span class="card-title">${book.title}</span>
            <p>${book.description}</p>
          </div>
          <div class="card-action">
            <button class="btn btn-small blue darken-2 waves-effect" onclick="openEditModal('${book._id}')">
              <i class="material-icons left">edit</i>Edit
            </button>
            <button class="btn btn-small red darken-2 waves-effect" onclick="openDeleteModal('${book._id}', '${book.title.replace(/'/g,"\\'")}')">
              <i class="material-icons left">delete</i>Delete
            </button>
          </div>
        </div>
      </div>`;
    grid.append(cardHtml);
  });
}

// ─── Stats ───────────────────────────────────────────────────
function updateStats(books) {
  $('#statTotal').text(books.length);
  const rated = books.filter(b => b.rating);
  $('#statRating').text(rated.length ? (rated.reduce((s, b) => s + b.rating, 0) / rated.length).toFixed(1) : '—');
  $('#statGenres').text(new Set(books.map(b => b.genre).filter(Boolean)).size || '—');
}

// ─── Genre filter dropdown ────────────────────────────────────
function populateGenreFilter(books) {
  const genres = [...new Set(books.map(b => b.genre).filter(Boolean))].sort();
  $('#genreFilter').html('<option value="">All Genres</option>');
  genres.forEach(g => $('#genreFilter').append(`<option value="${g}">${g}</option>`));
}

// ─── Search / Filter / Sort ───────────────────────────────────
function filterBooks() {
  let books = [...allBooks];
  const q     = $('#searchInput').val().toLowerCase().trim();
  const genre = $('#genreFilter').val();
  const sort  = $('#sortSelect').val();

  if (q) books = books.filter(b =>
    (b.title + ' ' + b.author + ' ' + b.genre + ' ' + b.description).toLowerCase().includes(q)
  );
  if (genre) books = books.filter(b => b.genre === genre);

  if (sort === 'rating') books.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else if (sort === 'year') books.sort((a, b) => (b.year || 0) - (a.year || 0));
  else books.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

  renderBooks(books);
}

// ═══════════════════════════════════════════════════════════
//  POST / PUT: Save Book (Add or Edit)
// ═══════════════════════════════════════════════════════════
function saveBook() {
  const editId = $('#editId').val().trim();
  const payload = {
    title:       $('#bookTitle').val().trim(),
    author:      $('#bookAuthor').val().trim(),
    genre:       $('#bookGenre').val().trim(),
    year:        $('#bookYear').val().trim(),
    rating:      $('#bookRating').val().trim(),
    image:       $('#bookImage').val().trim(),
    description: $('#bookDescription').val().trim()
  };

  if (!payload.title || !payload.author || !payload.description) {
    $('#formErrorMsg').text('Title, Author and Description are required.');
    $('#formError').show();
    return;
  }
  $('#formError').hide();

  const url    = editId ? '/api/books/' + editId : '/api/books';
  const method = editId ? 'PUT' : 'POST';

  $.ajax({
    url, method,
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function (response) {
      if (response.statusCode === 200 || response.statusCode === 201) {
        M.Modal.getInstance($('#addBookModal')[0]).close();
        M.toast({ html: response.message, classes: 'green rounded' });
        loadBooks();
      } else {
        $('#formErrorMsg').text(response.message || 'Server error.');
        $('#formError').show();
      }
    },
    error: function (xhr) {
      const msg = (xhr.responseJSON && xhr.responseJSON.message) ? xhr.responseJSON.message : 'Server error.';
      $('#formErrorMsg').text(msg);
      $('#formError').show();
    }
  });
}

// ═══════════════════════════════════════════════════════════
//  DELETE: Open Confirm Modal
// ═══════════════════════════════════════════════════════════
function openDeleteModal(id, title) {
  $('#deleteId').val(id);
  $('#deleteBookName').text('"' + title + '"');
  M.Modal.getInstance($('#deleteModal')[0]).open();
}

function confirmDelete() {
  const id = $('#deleteId').val();
  $.ajax({
    url:    '/api/books/' + id,
    method: 'DELETE',
    success: function (response) {
      M.Modal.getInstance($('#deleteModal')[0]).close();
      M.toast({ html: response.message, classes: 'orange rounded' });
      loadBooks();
    },
    error: function () {
      M.toast({ html: 'Delete failed.', classes: 'red rounded' });
    }
  });
}

// ═══════════════════════════════════════════════════════════
//  EDIT: Open modal pre-filled
// ═══════════════════════════════════════════════════════════
function openEditModal(id) {
  const book = allBooks.find(b => String(b._id) === String(id));
  if (!book) return;

  resetForm();
  $('#editId').val(book._id);
  $('#bookTitle').val(book.title);
  $('#bookAuthor').val(book.author);
  $('#bookGenre').val(book.genre);
  $('#bookYear').val(book.year);
  $('#bookRating').val(book.rating);
  $('#bookImage').val(book.image);
  $('#bookDescription').val(book.description);
  $('#modalHeading').html('<i class="material-icons left">edit</i>Edit Book');
  $('#saveBtnLabel').text('Update Book');
  M.updateTextFields();
  M.textareaAutoResize($('#bookDescription')[0]);
  M.Modal.getInstance($('#addBookModal')[0]).open();
}

// ─── Reset form ───────────────────────────────────────────
function resetForm() {
  ['editId','bookTitle','bookAuthor','bookGenre','bookYear','bookRating','bookImage','bookDescription'].forEach(id => {
    $('#' + id).val('');
  });
  $('#modalHeading').html('<i class="material-icons left">menu_book</i>Add New Book');
  $('#saveBtnLabel').text('Save Book');
  $('#formError').hide();
  M.updateTextFields();
}
