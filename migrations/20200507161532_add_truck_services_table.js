exports.up = function(knex, Promise) {
  return knex.schema.createTable("truck_services", (table) => {
    table.increments().index();

    table
      .integer("truck_service_id")
      .index()
      .unique();

    table.text("name").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("truck_services");
};
