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
  });
});

router.get('/:id/edit', (req, res, next) => {
  db.getAuthor(req.params.id).then((author) => {
    res.render('authors/editauthors', {author})
  });
});

router.post('/', (req, res, next) => {
  db.insertAuthor(req.body).then((data) => {
    res.redirect('/authors');
  });
});

router.put('/:id', (req, res, next) => {
  db.updateAuthor(req.params.id, req.body).then(data => {
    res.redirect('/authors/' + req.params.id);
  });
});

router.delete('/:id', (req, res, next) => {
  db.delAuthor(req.params.id).then(data => {
    res.redirect('/authors');
  });
});

module.exports = router;
