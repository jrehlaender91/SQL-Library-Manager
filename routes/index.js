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
      const err = new Error('Sorry, the book you are looking for does not exist.');
      err.status = 404;
      console.log(err);
      next(err);
    }
  }
}



/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.render("index", { books, title: "Sequelize-It!" });
}));

/* GET books listing. */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.render("index", { books, title: "Sequelize-It!" });
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
    res.redirect('/');
  } catch (error) {
    if (error.name === "SequelizeValidationError") { 
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors , title: "New Book" });
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
    res.sendStatus(404);
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
    res.sendStatus(404);
  }
}));

/* Update an book. */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;
  book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect("/books/" + book.id);
}));

module.exports = router;