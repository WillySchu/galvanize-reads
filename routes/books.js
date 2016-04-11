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
  // some code
});

router.post('/', (req, res) => {
  console.log(req.body);
  db.insertBook(req.body).then((data) => {
    res.send(data);
  });
});

module.exports = router;
