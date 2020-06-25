const knex = require('../../database/connection');

class TablesController {
  async index(req, res) {
    const listTables = await knex('tables')
      .select('id', 'occupied')
      .orderBy('id', 'asc');

    res.status(200).json(listTables);
  }
}

module.exports = new TablesController();
