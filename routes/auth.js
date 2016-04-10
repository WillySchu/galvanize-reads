const express = require('express');
const router = express.Router();
const Users = require('../models/users');


router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  if (!(req.body.password === req.body.repassword)) {
    return res.render('signin', {errors: 'Passwords must match'})
  }
  Users.createUser(req.body, (err, data) => {
    res.send(data);
  });
});

router.post('/signin', (req, res, next) => {
  Users.authenticateUser(req.body.email, req.body.password, (err, user) => {
    if (err) {
      res.render('signin', {error: err});
    } else {
      req.session.user = user;
      res.redirect('/');
    }
  })
});

module.exports = router;
