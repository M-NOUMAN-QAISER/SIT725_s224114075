const mongoose = require('mongoose');

/**
 * Book Model — Mongoose Schema
 * Defines the structure of a Book document in MongoDB.
 * Price is stored as Decimal128 as required by the task.
 */
const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

/**
 * toJSON transform — converts Decimal128 price to a plain string
 * so it serialises cleanly in JSON responses.
 */
bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.price) {
      ret.price = parseFloat(ret.price.toString()).toFixed(2);
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;