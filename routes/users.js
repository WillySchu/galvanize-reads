const express = require('express');
const router = express.Router();

const valid = require('../lib/validations');
const Users = require('../models/users');

router.get('/', (req, res, next) => {
  Users.getUsers().then(users => {
    res.render('users/users', {users});
  });
});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  Users.getUser(req.params.id).then(users => {
    console.log(users);
    res.render('users/user', {users});
  });
});

router.put('/:id', valid.reqAdmin, (req, res, next) => {
  Users.updateUser(req.params.id, req.body).then(user => {
    redirect('/users/' + req.params.id);
  });
});

router.delete('/:id', valid.reqAdmin, (req, res, next) => {
  Users.deleteUser(req.params.id).then(data => {
    res.redirect('/users');
  });
});

module.exports = router;
