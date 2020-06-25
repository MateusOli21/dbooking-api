exports.up = function (knex) {
  return knex.schema.createTable('bookings', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('table_id').notNullable().references('id').inTable('tables');
    table.datetime('date').notNullable();
    table.datetime('canceled_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('bookings');
};
