exports.up = function(knex, Promise) {
  return knex.schema.createTable("amenities", (table) => {
    table.increments().index();

    table.integer("location_id").index();
    table
      .foreign("location_id")
      .references("id")
      .inTable("locations");

    table.text("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("amenities");
};
