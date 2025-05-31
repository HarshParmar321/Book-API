
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { updateReview, deleteReview } = require('../controllers/reviewController');
const Review = require('../models/Review');

router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

router.get('/', async (req, res) => {
    try {
      const reviews = await Review.find().populate('book').populate('user');
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  });

module.exports = router;
