const express = require('express');
const router = express.Router();
const db = require('../lib/dbio');
const valid = require('../lib/validations')

router.get('/', (req, res, next) => {
  res.render('books/books');
});

router.get('/new', (req, res, next) => {
  res.render('books/newbook');
});

router.get('/genre/:genre', (req, res, next) => {
  db.getBookIdsByGenre(req.params.genre).then(ids => {
    const pbooks = db.filterBooksByIds(ids)
    Promise.all(pbooks).then(filterbooks => {
      res.render('books/filterbooks', {filterbooks})
    });
  });
});

router.get('/search', valid.reqAdmin, (req, res, next) => {
  db.searchBooks(req.query.q).then(data => {
    Promise.all(data).then(filterbooks => {
      res.render('books/books', {books: filterbooks});
    })
  });
});

router.get('/:id', (req, res, next) => {
  db.getBook(req.params.id).then((book) => {
    res.render('books/book', {book});
  });
});

router.get('/:id/edit', (req, res, next) => {
  db.getBook(req.params.id).then((book) => {
    res.render('books/editbook', {book});
  });
});


router.post('/', valid.reqAdmin, (req, res) => {
  db.insertBook(req.body).then((data) => {
    res.redirect('/books');
  });
});

router.put('/:id', valid.reqAdmin, (req, res) => {
  db.updateBook(req.params.id, req.body).then(data => {
    res.redirect('/books/' + req.params.id);
  })
});

router.delete('/:id', valid.reqAdmin, (req, res) => {
  db.delBook(req.params.id).then(data => {
    res.redirect('/books');
  });
});

module.exports = router;
