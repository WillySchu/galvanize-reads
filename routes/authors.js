const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

function Authors() {
  return knex('authors');
}

router.get('/', (req, res, next) => {
  Authors().select().then((data) => {
    console.log(data);
    res.render('authors', {authors: data});
  })
});

router.get('/new', (req, res) => {
  res.render('newauthor');
})

module.exports = router;
