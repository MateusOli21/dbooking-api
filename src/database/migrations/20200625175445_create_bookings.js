exports.up = function (knex) {
  return knex.schema.createTable('bookings', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('table_id').notNullable().references('id').inTable('tables');
    table.datetime('date').notNullable();
    table.datetime('canceled_at');

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('bookings');
};
