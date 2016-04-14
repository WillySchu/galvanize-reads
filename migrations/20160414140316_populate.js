const load = require('../load')
exports.up = function(knex, Promise) {
  return load();
};

exports.down = function(knex, Promise) {

};
