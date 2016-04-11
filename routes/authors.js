const express = require('express');
const router = express.Router();
const db = require('../lib/dbio');

router.get('/', (req, res, next) => {
  res.render('authors/authors');
});

router.get('/new', (req, res, next) => {
  res.render('authors/newauthor');
});

router.get('/:id', (req, res, next) => {
  db.getBooksByAuthor(req.params.id).then((authorbook) => {
    res.render('authors/author', {authorbook})
  })
});


router.post('/', (req, res, next) => {
  console.log(req.body);
  db.insertAuthor(req.body).then((data) => {
    res.send(data);
  });
});

module.exports = router;
