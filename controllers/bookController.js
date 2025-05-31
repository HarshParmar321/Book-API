
const Book = require('../models/Book');
const Review = require('../models/Review');

exports.getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: id })
      .populate('user', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const avgRatingAgg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    const avgRating = avgRatingAgg.length ? avgRatingAgg[0].avgRating.toFixed(1) : null;

    res.json({ book, avgRating, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Search query is required' });

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
