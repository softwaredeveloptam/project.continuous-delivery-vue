const fs = require("fs");
const db = require("../server/knex.js");

const seedDB = async () => {
  try {
    const locations = JSON.parse(fs.readFileSync("./data/locations.json"));
    for (const location of locations) {
      const id = location.Site.SiteId;
      const latitude = location.Site.Latitude;
      const longitude = location.Site.Longitude;
      const site_name = location.Site.SiteName;
      const name = location.Name;
      const state = location.Addresses[0].State;
      const city = location.Addresses[0].City;
      const highway = location.Site.Highway;
      const type = location.FacilitySubtype.Name;

      const result = await db("locations").insert({
        id,
        latitude,
        longitude,
        site_name,
        name,
        state,
        city,
        highway,
        type,
      });

      console.log(result);
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};

module.exports = seedDB;
