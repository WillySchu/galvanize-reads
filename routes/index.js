var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const user = req.session.user;
  res.render('landing');
});

module.exports = router;
