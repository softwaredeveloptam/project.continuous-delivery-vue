const fs = require("fs");
const db = require("../server/knex.js");
const knex = require("knex");

const locations = JSON.parse(fs.readFileSync("./data/locations.json"));

const seedLocationsDB = async () => {
  try {
    for (const location of locations) {
      // insert data into locations table
      const id = location.Site.SiteId;
      const latitude = location.Site.Latitude;
      const longitude = location.Site.Longitude;
      const site_name = location.Site.SiteName;
      const name = location.Name;
      const state = location.Addresses[0].State;
      const city = location.Addresses[0].City;
      const highway = location.Site.Highway;
      const type = location.FacilitySubtype.Name;

      await knex(db)("locations").insert({
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

      // for each amenities
      // joint table insert location.id, ammenity,
      // location.id, ammenity_id2,
      // location.id, ammenity_id3,
      // uniq? insert amenities table

      //for each truck

      //for each restaurants
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};

const seedAmenitiesDB = async () => {
  try {
    const db_amenities_obj = {};
    const db_truck_obj = {};
    for (const location of locations) {
      for (const object of location.CustomFields) {
        const name = object.CustomField.Label;
        const type = object.CustomField.Section;
        // insert data into amenities table
        if (type === "Select Amenities") {
          let amenity_id = object.CustomField.Id;
          if (!db_amenities_obj[amenity_id]) {
            await knex(db)("amenities").insert({
              amenity_id,
              name,
            });
            db_amenities_obj[amenity_id] = 1;
          }
        } else {
          // insert data into truck_services table
          let truck_service_id = object.CustomField.Id;
          if (!db_truck_obj[truck_service_id]) {
            await knex(db)("truck_services").insert({
              truck_service_id,
              name,
            });
            db_truck_obj[truck_service_id] = 1;
          }
        }
      }
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};

const seedRestaurantsDB = async () => {
  const db_restaurant_obj = {};
  try {
    for (const location of locations) {
      if (location.Site.Concepts) {
        for (const concept of location.Site.Concepts) {
          const restaurant_id = concept.Concept.Id;
          const name = concept.Concept.Name;
          if (!db_restaurant_obj[restaurant_id]) {
            await knex(db)("restaurants").insert({
              restaurant_id,
              name,
            });
            db_restaurant_obj[restaurant_id] = 1;
          }
        }
      }
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};

module.exports = { seedLocationsDB, seedAmenitiesDB, seedRestaurantsDB };
