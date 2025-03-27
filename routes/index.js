var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      // Forward error to the global error handler
      console.log("Error: OH NO");
      next(error);
    }
  }
}

/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  res.redirect("/books");
}));

/* GET books listing. */
router.get('/books', asyncHandler(async (req, res) => {
  res.render("index");
}));

/* Create a new book form. */
router.get('/books/new', (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
});

/* POST create article. */
router.post('/', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect("/books/" + book.id);
}));

module.exports = router;