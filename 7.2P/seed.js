/**
 * seed.js
 * Populates the MongoDB 'booksdb' database with the five required books.
 * Run with: node seed.js
 */

const mongoose = require('mongoose');
const Book = require('./models/book.model');

const MONGO_URI = 'mongodb://127.0.0.1:27017/booksdb';

const seedData = [
  {
    id: 'b1',
    title: 'The Three-Body Problem',
    author: 'Liu Cixin',
    year: 2008,
    genre: 'Science Fiction',
    summary:
      "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another, a representative example of the three-body problem in orbital mechanics.",
    price: mongoose.Types.Decimal128.fromString('29.99')
  },
  {
    id: 'b2',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    year: 1847,
    genre: 'Classic',
    summary:
      "An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester's secret and forging her own independence.",
    price: mongoose.Types.Decimal128.fromString('22.00')
  },
  {
    id: 'b3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    genre: 'Classic',
    summary:
      'Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage.',
    price: mongoose.Types.Decimal128.fromString('22.00')
  },
  {
    id: 'b4',
    title: 'The English Patient',
    author: 'Michael Ondaatje',
    year: 1992,
    genre: 'Historical Fiction',
    summary:
      'In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss.',
    price: mongoose.Types.Decimal128.fromString('25.39')
  },
  {
    id: 'b5',
    title: 'Small Gods',
    author: 'Terry Pratchett',
    year: 1992,
    genre: 'Fantasy',
    summary:
      'In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief. The Discworld is flat and is orbited by its sun, but Omnian doctrine says that the world is round and orbits the sun.',
    price: mongoose.Types.Decimal128.fromString('31.99')
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);

    // Clear existing documents
    await Book.deleteMany({});
    console.log('Cleared existing books.');

    // Insert seed data
    await Book.insertMany(seedData);
    console.log(`Seeded ${seedData.length} books successfully:`);
    seedData.forEach((b) =>
      console.log(`  [${b.id}] ${b.title} — AUD ${b.price}`)
    );
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();