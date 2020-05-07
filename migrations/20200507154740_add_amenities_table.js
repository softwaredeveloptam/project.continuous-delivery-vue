exports.up = function(knex, Promise) {
  return knex.schema.createTable("amenities", (table) => {
    table.increments().index();

    table
      .integer("amenity_id")
      .index()
      .unique();

    table.text("name").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("amenities");
};
