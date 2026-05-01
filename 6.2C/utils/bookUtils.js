/**
 * bookUtils.js
 * Pure calculation/utility functions for the Books Catalog.
 * These are kept separate from the database so they can be unit-tested
 * without any MongoDB connection.
 */

/**
 * Calculates the total price of an array of books.
 * @param {Array<{price: string|number}>} books
 * @returns {number} total price rounded to 2 decimal places
 */
function calculateTotalPrice(books) {
  if (!Array.isArray(books)) return 0;
  const total = books.reduce((sum, book) => {
    const price = parseFloat(book.price);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);
  return parseFloat(total.toFixed(2));
}

/**
 * Calculates the average price of an array of books.
 * @param {Array<{price: string|number}>} books
 * @returns {number} average price rounded to 2 decimal places, or 0 for empty array
 */
function calculateAveragePrice(books) {
  if (!Array.isArray(books) || books.length === 0) return 0;
  const total = calculateTotalPrice(books);
  return parseFloat((total / books.length).toFixed(2));
}

/**
 * Filters books published within a given year range (inclusive).
 * @param {Array<{year: number}>} books
 * @param {number} startYear
 * @param {number} endYear
 * @returns {Array} filtered books
 */
function filterBooksByYearRange(books, startYear, endYear) {
  if (!Array.isArray(books)) return [];
  return books.filter(
    (book) => book.year >= startYear && book.year <= endYear
  );
}

/**
 * Applies a percentage discount to a price.
 * @param {number} price
 * @param {number} discountPercent  (e.g. 10 means 10%)
 * @returns {number} discounted price rounded to 2 decimal places
 */
function applyDiscount(price, discountPercent) {
  if (typeof price !== 'number' || typeof discountPercent !== 'number') return 0;
  if (discountPercent < 0 || discountPercent > 100) return price;
  const discounted = price * (1 - discountPercent / 100);
  return parseFloat(discounted.toFixed(2));
}

module.exports = {
  calculateTotalPrice,
  calculateAveragePrice,
  filterBooksByYearRange,
  applyDiscount,
};