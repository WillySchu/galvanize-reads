exports.up = function(knex, Promise) {
  return knex.schema.createTable('jointable', (table) => {
    table.increments();
    table.integer('author_id').references('id').inTable('authors').onDelete('CASCADE').notNullable();
    table.integer('book_id').references('id').inTable('books').onDelete('CASCADE').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jointable');
};
