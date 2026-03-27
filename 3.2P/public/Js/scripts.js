$(document).ready(function() {
  // Initialize Materialize Components
  M.AutoInit();
  loadBooks();

  // Button Listeners
  $('#saveBookBtn').click(saveBook);
  
  // Prac 3 Required Console Logging Form
  $('#demoForm').on('submit', function(e) {
    e.preventDefault();
    const formData = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val()
    };
    console.log('--- Prac 3 Demo Form Submitted ---');
    console.table(formData);
    M.toast({html: 'Form Submitted! Check Console (F12)', classes: 'blue rounded'});
    M.Modal.getInstance($('#demoModal')).close();
  });
});

// GET: Fetch Books and Create Cards
function loadBooks() {
  fetch('/api/books')
    .then(res => res.json())
    .then(books => {
      const grid = $('#books-grid');
      grid.empty();
      books.forEach(book => {
        const cardHtml = `
          <div class="col s12 m6 l3">
            <div class="card book-card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${book.image}" alt="${book.title}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${book.title}<i class="material-icons right">more_vert</i></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${book.title}<i class="material-icons right">close</i></span>
                <p>${book.description}</p>
              </div>
              <div class="card-action center-align">
                <a class="waves-effect btn-small red delete-btn" data-id="${book.id}"><i class="material-icons left">delete</i>Delete</a>
              </div>
            </div>
          </div>`;
        grid.append(cardHtml);
      });
      // Attach Delete Listener
      $('.delete-btn').click(function() { deleteBook($(this).data('id')); });
    })
    .catch(err => console.error('Error fetching books:', err));
}

// POST: Save a New Book
function saveBook() {
  const bookData = {
    title: $('#bookTitle').val().trim(),
    description: $('#bookDesc').val().trim(),
    image: $('#bookImage').val().trim() || 'images/book-icon.png'
  };

  if (!bookData.title || !bookData.description) {
    M.toast({html: 'Title and Description are required!', classes: 'red rounded'});
    return;
  }

  fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  })
  .then(res => res.json())
  .then(() => {
    M.Modal.getInstance($('#bookModal')).close();
    $('#bookTitle').val(''); $('#bookDesc').val(''); $('#bookImage').val('');
    loadBooks();
    M.toast({html: 'Book added successfully!', classes: 'green rounded'});
  });
}

// DELETE: Delete a Book
function deleteBook(id) {
  if (!confirm('Are you sure you want to delete this book?')) return;
  fetch(`/api/books/${id}`, { method: 'DELETE' })
    .then(() => {
      loadBooks();
      M.toast({html: 'Book deleted!', classes: 'orange rounded'});
    });
}