require("dotenv").config();

const db_config = {
  directory: "../migrations",
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}:${process.env.PASSWORD}@127.0.0.1:5432/truckstop`,
  searchPath: "public",
};

module.exports = db_config;
