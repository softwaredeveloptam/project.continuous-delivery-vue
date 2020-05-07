exports.up = function(knex, Promise) {
  return knex.schema.createTable("locations", (table) => {
    table.increments().index();

    table.float("latitude");

    table.float("longitude");

    table.text("site_name").notNullable();

    table.text("name");

    table.text("state");

    table.text("city");

    table.text("highway");

    table.text("type");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("locations");
};
