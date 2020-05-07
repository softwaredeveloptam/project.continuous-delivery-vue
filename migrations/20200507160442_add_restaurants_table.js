exports.up = function(knex, Promise) {
  return knex.schema.createTable("restaurants", (table) => {
    table.increments().index();

    table
      .integer("restaurant_id")
      .index()
      .unique();

    table.text("name").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("restaurants");
};
