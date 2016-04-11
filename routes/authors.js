const express = require('express');
const router = express.Router();
const db = require('../lib/dbio');

router.get('/', (req, res, next) => {
  res.render('authors/authors');
});

router.get('/:id', (req, res, next) => {
  db.getAuthor(req.params.id).then((author) => {
   console.log(author);
   res.render('authors/authors', {authors: author})
  });
});

router.get('/new', (req, res) => {
  res.render('authors/newauthor');
});

router.post('/', (req, res) => {
  console.log(req.body);
  db.insertAuthor(req.body).then((data) => {
    res.send(data);
  });
});

module.exports = router;
