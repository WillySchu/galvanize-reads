const express = require('express');
const router = express.Router();
const db = require('../lib/dbio');

router.get('/', (req, res, next) => {
  res.render('books/books');
});

router.get('/new', (req, res) => {
  res.render('books/newbook');
});

router.get('/:id', (req, res, next) => {
  db.getBook(req.params.id).then((book) => {
    res.render('books/book', {book});
  })
});

router.get('/:id/edit', (req, res, next) => {
  db.getBook(req.params.id).then((book) => {
    res.render('books/editbook', {book});
  })
})

router.post('/', (req, res) => {
  db.insertBook(req.body).then((data) => {
    res.redirect('/books');
  });
});

router.put('/:id', (req, res) => {
  db.updateBook(req.params.id, req.body).then(data => {
    res.redirect('/books/' + req.params.id);
  })
});

module.exports = router;
