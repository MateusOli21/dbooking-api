const knex = require('../../database/connection');
const {
  startOfDay,
  endOfDay,
  parseISO,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
} = require('date-fns');

class TablesController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ erro: 'You have to pass a date.' });
    }

    const searchDate = parseISO(date);

    const bookings = await knex('bookings')
      .select('id', 'table_id', 'date')
      .where({ canceled_at: null })
      .whereBetween('date', [startOfDay(searchDate), endOfDay(searchDate)]);

    const schedule = ['18:00', '19:00', '20:00', '21:00', '22:00'];

    const tables = await knex('tables').select('id').orderBy('id', 'asc');

    const tablesSchedule = schedule.map((time) => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      const tablesAvailable = tables.map((table) => {
        return {
          table_id: table.id,
          available:
            isAfter(value, new Date()) &&
            !bookings.find(
              (bkg) =>
                format(bkg.date, 'HH:mm') === time && bkg.table_id === table.id
            ),
        };
      });

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        tablesAvailable,
      };
    });

    res.status(200).json(tablesSchedule);
  }
}

module.exports = new TablesController();
