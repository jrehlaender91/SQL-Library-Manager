var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      next(err);
    }
  }
}


/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.render("index", { books, title: "Books" });
}));

/* GET books listing. */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.render("index", { books, title: "Books" });
}));

/* Create a new book form. */
router.get('/books/new', (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
});

/* POST create book. */
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("form-error", { book, errors: error.errors, title: "New Book" });
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
}));

/* GET individual book. */
router.get("/books/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render("update-book", { book, title: book.title });
  } else {
    res.render('page-not-found');
  }
}));

/* Delete individual book. */
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/");
  }
  else {
    res.render('page-not-found');
  }
}));

/* Update an book. */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect("/books/");
    } else {
      res.render('page-not-found');
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("form-error", { book, errors: error.errors, title: "Update Book" });
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
}));

module.exports = router;