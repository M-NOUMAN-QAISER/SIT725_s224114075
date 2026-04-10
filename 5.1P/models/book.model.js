/**
 * Book Model
 * Represents the data structure of a Book entity.
 */
class Book {
  constructor(id, title, author, year, genre, summary) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.summary = summary;
  }
}
 
module.exports = Book;
 