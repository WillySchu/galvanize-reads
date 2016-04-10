var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.session.username = 'Jeff';
  res.render('landing');
});

module.exports = router;
