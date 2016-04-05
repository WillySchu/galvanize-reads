exports.up = function(knex, Promise) {
  return knex.schema.createTable('join', (table) => {
    table.increments();
    table.integer('author_id').references('id').inTable('authors').onDelete('CASCADE');
    table.integer('book_id').references('id').inTable('books').onDelete('CASCADE');
  })
  return
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('join');
};
