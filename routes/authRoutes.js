
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/about', (req, res) => {
    res.json({
      author: "Harsh Parmar",
      project: "Books API",
      description: "A secure book and review management API built with Node.js, Express, and MongoDB.",
      github: "https://github.com/<your-username>/<repo-name>"
    });
  });
  
module.exports = router;
