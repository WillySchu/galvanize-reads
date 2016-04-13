const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

function Users() {
  return knex('users');
}

Users.createUser = (data, callback) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      callback(err);
    }

    bcrypt.hash(data.password, salt, (err, hash) => {
      if (err) {
        callback(err);
      }

      data.password_digest = hash;
      delete data.password;
      delete data.password_confirm;
      Users().insert(data, '*').then((data) => {
        callback(undefined, data);
      });
    });
  });
}

Users.authenticateUser = (emailOrName, password, callback) => {
  const error = ['Email and password don\'t match'];
  Users().where({email: emailOrName}).orWhere({name: emailOrName}).first().then(user => {
    if(!user) return callback(error);
    bcrypt.compare(password, user.password_digest, (err, isMatch) => {
      if (err || !isMatch) {
        console.log(error);
        return callback(error);
      } else {
        return callback(undefined, user);
      }
    })
  })
}

module.exports = Users;
