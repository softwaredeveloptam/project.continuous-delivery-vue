const app = require("./app");
const db = require("./knex");
const {
  seedLocationsDB,
  seedAmenitiesDB,
  seedRestaurantsDB,
} = require("../data/import");

const PORT = process.env.PORT || 9000;
const knex = require("knex");

(async () => {
  try {
    console.log("Running migrations");
    await knex(db).migrate.latest();

    console.log("Seeding database");
    await seedLocationsDB();
    await seedAmenitiesDB();
    await seedRestaurantsDB();

    console.log("Starting express");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
