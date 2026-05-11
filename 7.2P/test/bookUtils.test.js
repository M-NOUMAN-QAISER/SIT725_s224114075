/**
 * test/bookUtils.test.js
 * Unit tests for pure calculation functions in utils/bookUtils.js.
 * No database or network connection is required.
 */

const { expect } = require('chai');
const {
  calculateTotalPrice,
  calculateAveragePrice,
  filterBooksByYearRange,
  applyDiscount,
} = require('../utils/bookUtils');

// ─── Sample data used across tests ────────────────────────────────────────────
const sampleBooks = [
  { id: 'b1', title: 'Clean Code',          year: 2008, price: '29.99' },
  { id: 'b2', title: 'The Pragmatic Programmer', year: 1999, price: '39.99' },
  { id: 'b3', title: 'Design Patterns',     year: 1994, price: '49.99' },
  { id: 'b4', title: 'You Don\'t Know JS',  year: 2015, price: '19.99' },
];

// ─────────────────────────────────────────────────────────────────────────────
describe('Calculation Functions — bookUtils', function () {

  // ── calculateTotalPrice ──────────────────────────────────────────────────
  describe('calculateTotalPrice()', function () {

    it('should return the correct total for a list of books (valid behaviour)', function () {
      const total = calculateTotalPrice(sampleBooks);
      // 29.99 + 39.99 + 49.99 + 19.99 = 139.96
      expect(total).to.equal(139.96);
    });

    it('should return 0 for an empty array (edge case)', function () {
      const total = calculateTotalPrice([]);
      expect(total).to.equal(0);
    });

    it('should return 0 when given a non-array (invalid/error behaviour)', function () {
      const total = calculateTotalPrice(null);
      expect(total).to.equal(0);
    });

    it('should ignore books with non-numeric prices (edge case)', function () {
      const books = [
        { price: '10.00' },
        { price: 'FREE' },
        { price: '5.00' },
      ];
      expect(calculateTotalPrice(books)).to.equal(15.00);
    });
  });

  // ── calculateAveragePrice ────────────────────────────────────────────────
  describe('calculateAveragePrice()', function () {

    it('should return the correct average price (valid behaviour)', function () {
      const avg = calculateAveragePrice(sampleBooks);
      // 139.96 / 4 = 34.99
      expect(avg).to.equal(34.99);
    });

    it('should return 0 for an empty array (edge case)', function () {
      expect(calculateAveragePrice([])).to.equal(0);
    });

    it('should return the price itself when there is only one book (edge case)', function () {
      expect(calculateAveragePrice([{ price: '24.95' }])).to.equal(24.95);
    });
  });

  // ── filterBooksByYearRange ───────────────────────────────────────────────
  describe('filterBooksByYearRange()', function () {

    it('should return books within the specified year range (valid behaviour)', function () {
      const result = filterBooksByYearRange(sampleBooks, 1999, 2010);
      // Should include: Clean Code (2008), The Pragmatic Programmer (1999)
      expect(result).to.have.lengthOf(2);
      expect(result.map((b) => b.id)).to.include.members(['b1', 'b2']);
    });

    it('should return an empty array when no books fall in range (edge case)', function () {
      const result = filterBooksByYearRange(sampleBooks, 2020, 2025);
      expect(result).to.be.an('array').that.is.empty;
    });

    it('should return an empty array for non-array input (invalid/error behaviour)', function () {
      expect(filterBooksByYearRange('not an array', 2000, 2020)).to.deep.equal([]);
    });
  });

  // ── applyDiscount ────────────────────────────────────────────────────────
  describe('applyDiscount()', function () {

    it('should correctly apply a 10% discount (valid behaviour)', function () {
      // 29.99 * 0.90 = 26.99 (rounded)
      expect(applyDiscount(29.99, 10)).to.equal(26.99);
    });

    it('should return the original price for a 0% discount (edge case)', function () {
      expect(applyDiscount(50.00, 0)).to.equal(50.00);
    });

    it('should return 0 for a 100% discount (edge case)', function () {
      expect(applyDiscount(50.00, 100)).to.equal(0);
    });

    it('should return 0 for non-numeric inputs (invalid/error behaviour)', function () {
      expect(applyDiscount('price', 10)).to.equal(0);
    });
  });
});