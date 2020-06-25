const knex = require('../../database/connection');
const Yup = require('yup');

class BookingController {
  async index(req, res) {
    const user_id = req.userId;

    const listBookings = await knex('bookings')
      .select('table_id', 'date', 'canceled_at')
      .where({ user_id });

    res.status(200).json(listBookings);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      table_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const user_id = req.userId;
    const { table_id, date } = req.body;

    const dateOcuppied = await knex('bookings').where({ date }).first();

    if (dateOcuppied) {
      return res
        .status(400)
        .json({ error: 'This date already already has a reservation.' });
    }
    const trx = await knex.transaction();

    const bookingTable = await trx('bookings')
      .insert({ user_id, table_id, date })
      .returning(['id', 'user_id', 'table_id']);

    await trx('tables').where({ id: table_id }).update({ occupied: true });

    await trx.commit();

    res.status(200).json(bookingTable);
  }

  async delete(req, res) {
    const { id } = req.params;

    const bookingExists = await knex('bookings').where({ id }).first();

    if (!bookingExists) {
      return res.status(400).json({ error: 'Reservation does not exists.' });
    }

    const trx = await knex.transaction();

    const date = new Date();

    await trx('bookings').where({ id }).update({ canceled_at: date });

    await trx('tables')
      .where({ id: bookingExists.table_id })
      .update({ occupied: false });

    await trx.commit();

    res.status(204).send();
  }
}

module.exports = new BookingController();
