
const Review = require('../models/Review');
const Book = require('../models/Book');

exports.createReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user._id;
    const { rating, reviewText } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const alreadyReviewed = await Review.findOne({ book: bookId, user: userId });
    if (alreadyReviewed)
      return res.status(400).json({ message: 'You have already reviewed this book' });

    const review = await Review.create({ book: bookId, user: userId, rating, reviewText });
    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, reviewText } = req.body;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You can only update your own review' });
    }

    review.rating = rating || review.rating;
    review.reviewText = reviewText || review.reviewText;
    await review.save();
    res.json({ message: 'Review updated', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You can only delete your own review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
