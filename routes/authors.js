const express = require('express');
const router = express.Router();
const db = require('../lib/dbio');
const valid = require('../lib/validations');

router.get('/', (req, res, next) => {
  res.render('authors/authors');
});

router.get('/new', (req, res, next) => {
  res.render('authors/newauthor');
});

router.get('/search', valid.reqAdmin, (req, res, next) => {
  db.searchAuthors(req.query.q).then(promises => {
    Promise.all(promises).then(data => {
      res.render('authors/authors', {authorbooks: data});
    });
  });
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

router.post('/', valid.reqAdmin, (req, res, next) => {
  console.log(req.body);
  const errors = valid.checkAuthor(req.body);
  if (errors && errors.length > 0) {
    return res.render('authors/newauthor', {errors, a: req.body})
  }
  db.insertAuthor(req.body).then((data) => {
    res.redirect('/authors');
  });
});

router.put('/:id', valid.reqAdmin, (req, res, next) => {
  db.updateAuthor(req.params.id, req.body).then(data => {
    res.redirect('/authors/' + req.params.id);
  });
});

router.delete('/:id', valid.reqAdmin, (req, res, next) => {
  db.delAuthor(req.params.id).then(data => {
    res.redirect('/authors');
  });
});

module.exports = router;
