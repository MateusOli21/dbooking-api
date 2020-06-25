exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tables')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        { id: 1, occupied: false },
        { id: 2, occupied: false },
        { id: 3, occupied: false },
        { id: 4, occupied: false },
        { id: 5, occupied: false },
        { id: 6, occupied: false },
        { id: 7, occupied: false },
        { id: 8, occupied: false },
        { id: 9, occupied: false },
        { id: 10, occupied: false },
      ]);
    });
};
