const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const validate = require('../lib/validations');


router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.get('/signout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.post('/signup', (req, res, next) => {
  errors = validate.checkPassword(req.body);
  if (errors && errors.length > 0) {
    console.log(errors);
    return res.render('signin', {signupErrors: errors});
  }
  Users.createUser(req.body, (err, user) => {
    req.session.user = user[0];
    res.redirect('/')
  });
});

router.post('/signin', (req, res, next) => {
  Users.authenticateUser(req.body.emailOrName, req.body.password, (errors, user) => {
    if (errors && errors.length > 0) {
      return res.render('signin', {signinErrors: errors});
    } else {
      req.session.user = user;
      res.redirect('/');
    }
  });
});

router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/signin');
  }
});

module.exports = router;
