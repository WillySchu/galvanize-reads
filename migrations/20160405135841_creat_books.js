exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.integer('author1_id').references('id').inTable('authors').onDelete('CASCADE');
    table.integer('author2_id').references('id').inTable('authors').onDelete('CASCADE');
    table.integer('author3_id').references('id').inTable('authors').onDelete('CASCADE');
    table.string('title').unique();
    table.string('genre');
    table.text('description');
    table.string('cover_url');
  })
  return
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
