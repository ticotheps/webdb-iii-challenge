
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { 
          name: 'Tico Thepsourinthone',
          cohort_id: 1
        },
        { 
          name: 'Lowell Richardson',
          cohort_id: 1
        },
        { 
          name: 'Jamie Goodnight',
          cohort_id: 1
        },
        { 
          name: 'Cecil Tantay',
          cohort_id: 3
        }
      ]);
    });
};
