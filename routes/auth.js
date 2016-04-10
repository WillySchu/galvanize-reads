const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const validate = require('../lib/validations');


router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  errors = validate.checkPassword(req.body);
  if (errors) {
    return res.render('signin', {errors});
  }
  Users.createUser(req.body, (err, data) => {
    res.send(data);
  });
});

router.post('/signin', (req, res, next) => {
  Users.authenticateUser(req.body.email, req.body.name, req.body.password, (err, user) => {
    if (err) {
      res.render('signin', {error: err});
    } else {
      console.log(user);
      req.session.user = user;
      console.log(req.session);
      // req.session.save();
      console.log(res.req.headers);
      res.redirect('/');
    }
  });
});

module.exports = router;
