exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.unique(['first_name', 'last_name'])
    table.string('portrait_url');
    table.text('biography');
  })
  return
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
