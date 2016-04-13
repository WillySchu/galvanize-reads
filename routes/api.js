const express = require('express');
const router = express.Router();

const db = require('../lib/dbio');

router.get('/', (req, res, next) => {
  db.getAuthors().then(data => {
    res.send(data);
  });
});

module.exports = router;
