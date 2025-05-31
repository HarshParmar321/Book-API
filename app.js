
const express = require('express');
const cors = require('cors');
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes);

module.exports = app;
