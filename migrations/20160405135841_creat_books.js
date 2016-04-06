exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.string('author1').notNullable();
    table.string('author2');
    table.string('author3');
    table.string('title').unique().notNullable();
    table.string('genre');
    table.text('description');
    table.string('cover_url');
  })
  return
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
