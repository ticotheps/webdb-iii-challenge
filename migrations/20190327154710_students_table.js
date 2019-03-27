// the new changes we need to make
exports.up = function(knex) {
    return knex.schema.createTable('students', function(tbl) {
        // primary key, called 'id' and make it auto-increment
        tbl.increments();
  
        tbl
          .string('name', 128)
          .notNullable()
          .unique();
    });
  };
  
  // how to undo the changes made in the function above
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students');
  };
  