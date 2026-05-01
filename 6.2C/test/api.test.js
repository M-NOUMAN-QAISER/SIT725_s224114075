/**
 * test/api.test.js
 * Integration / API tests for the Books Catalog REST endpoints.
 * Uses supertest to send real HTTP requests to the Express app
 * without starting a server on a port or connecting to a real MongoDB.
 *
 * Mongoose is stubbed via sinon-style manual mocking so the tests
 * run fully offline — no database required.
 */

const { expect } = require('chai');
const request    = require('supertest');

// ─── Stub the Book model BEFORE requiring the app ─────────────────────────────
// This prevents Mongoose from attempting a real DB query during tests.
const mongoose = require('mongoose');

// We intercept Model.find() and Model.findOne() at the mongoose level
// by replacing the model factory after schema registration.
const Book = require('../models/book.model');

const SAMPLE_BOOKS = [
  {
    id: 'b1', title: 'Clean Code', author: 'Robert C. Martin',
    year: 2008, genre: 'Software Engineering',
    summary: 'A handbook of agile software craftsmanship.',
    price: '29.99',
  },
  {
    id: 'b2', title: 'The Pragmatic Programmer', author: 'Andy Hunt',
    year: 1999, genre: 'Software Engineering',
    summary: 'Tips for modern software development.',
    price: '39.99',
  },
];

// Replace Mongoose exec methods with stubs before the app is loaded.
// We monkey-patch the model prototype methods used by the service layer.
Book.find     = () => Promise.resolve(SAMPLE_BOOKS);
Book.findOne  = (query) => {
  const match = SAMPLE_BOOKS.find((b) => b.id === query.id);
  return Promise.resolve(match || null);
};

// Now it is safe to load the app (server.js won't call mongoose.connect
// because require.main !== module in test context).
const app = require('../server');

// ─────────────────────────────────────────────────────────────────────────────
describe('Books Catalog REST API', function () {

  // ── GET /api/books ──────────────────────────────────────────────────────
  describe('GET /api/books', function () {

    it('should return HTTP 200 and an array of books (valid behaviour)', async function () {
      const res = await request(app).get('/api/books');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });

    it('should include expected book fields in every item (valid behaviour)', async function () {
      const res = await request(app).get('/api/books');
      res.body.forEach((book) => {
        expect(book).to.have.all.keys('id', 'title', 'author', 'year', 'genre', 'summary', 'price');
      });
    });
  });

  // ── GET /api/books/:id ──────────────────────────────────────────────────
  describe('GET /api/books/:id', function () {

    it('should return HTTP 200 and the correct book for a valid id (valid behaviour)', async function () {
      const res = await request(app).get('/api/books/b1');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('id', 'b1');
      expect(res.body).to.have.property('title', 'Clean Code');
    });

    it('should return HTTP 404 for an id that does not exist (error behaviour)', async function () {
      const res = await request(app).get('/api/books/DOES_NOT_EXIST');
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error');
    });

    it('should return HTTP 404 for a numeric id that is not in the catalogue (edge case)', async function () {
      const res = await request(app).get('/api/books/99999');
      expect(res.status).to.equal(404);
    });
  });

  // ── GET /api/integrity-check42 ──────────────────────────────────────────
  describe('GET /api/integrity-check42', function () {

    it('should return HTTP 204 No Content (valid behaviour)', async function () {
      const res = await request(app).get('/api/integrity-check42');
      expect(res.status).to.equal(204);
    });
  });

  // ── Unknown routes ───────────────────────────────────────────────────────
  describe('Unknown routes', function () {

    it('should return HTTP 404 for a completely unknown endpoint (error behaviour)', async function () {
      const res = await request(app).get('/api/does-not-exist');
      expect(res.status).to.equal(404);
    });
  });
});