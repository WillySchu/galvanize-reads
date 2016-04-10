const express = require('express');
const router = express.Router();
const db = require('../lib/dbio');

router.get('/', (req, res, next) => {
  res.render('authors');
});

router.get('/:id', (req, res, next) => {
 // some code
})

router.get('/new', (req, res) => {
  res.render('newauthor');
})

router.post('/', (req, res) => {
  console.log(req.body);
  db.insertAuthor(req.body).then((data) => {
    res.send(data);
  })
})

module.exports = router;
