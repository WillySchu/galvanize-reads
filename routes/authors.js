const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('authors');
});

router.get('/new', (req, res) => {
  res.render('newauthor');
})

module.exports = router;
