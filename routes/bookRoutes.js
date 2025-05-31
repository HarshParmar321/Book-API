
const express = require('express');
const router = express.Router();
const { searchBooks, getBookDetails } = require('../controllers/bookController');
const { createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const Book = require('../models/Book');


router.get('/search', searchBooks);
router.get('/:id', getBookDetails);
router.post('/:id/reviews', protect, createReview);
// Add this route temporarily
router.post('/seed', async (req, res) => {
    const books = await Book.insertMany([
      { title: "Atomic Habits", author: "James Clear", genre: "Self-help" },
      { title: "1984", author: "George Orwell", genre: "Dystopian" },
      { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction" }
    ]);
    res.send(books);
  });
  

  router.get('/', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching books' });
    }
  });
module.exports = router;
