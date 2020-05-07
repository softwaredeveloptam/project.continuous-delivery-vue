const app = require("./app");
const db = require("./knex");
const seedDB = require("../data/import");
const PORT = process.env.PORT || 9000;

(async () => {
  try {
    console.log("Running migrations");
    await db.migrate.latest();
    await seedDB();

    console.log("Starting express");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
