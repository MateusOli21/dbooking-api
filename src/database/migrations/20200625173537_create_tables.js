exports.up = function (knex) {
  return knex.schema.createTable('tables', (table) => {
    table.increments('id').primary();
    table.boolean('occupied').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tables');
};
