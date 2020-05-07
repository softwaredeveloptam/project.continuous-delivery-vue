const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}:${process.env.PASSWORD}@127.0.0.1:5432/truckstop`,
  searchPath: "public",
});

module.exports = db;
