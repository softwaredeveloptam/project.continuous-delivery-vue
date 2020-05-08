const db = require("../server/knex.js");
const knex = require("knex");
const fs = require("fs");

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
      const highway_exit_num = location.Site.ExitNumber;
      const street_address = location.Addresses[0].Address1;

      // find main phone and fax number
      const telephone = location.ContactMethods.find(
        (contactMethod) => contactMethod.Type.Name === "Main Phone"
      ).Data;
      const fax = location.ContactMethods.find(
        (contactMethod) => contactMethod.Type.Name === "Fax"
      ).Data;

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
        highway_exit_num,
        street_address,
        telephone,
        fax,
      });
    }
  } catch (err) {
    console.error("Error inserting locations records", err);
  }
};

const seedAmenitiesDB = async () => {
  const amenities = [];
  const truck_services = [];
  try {
    for (const location of locations) {
      const location_id = location.Site.SiteId;
      for (const customField of location.CustomFields) {
        const name = customField.CustomField.Label;
        const type = customField.CustomField.Section;
        // insert data into amenities table
        if (type === "Select Amenities") {
          amenities.push({ location_id: location_id, name: name });
        } else {
          truck_services.push({
            location_id: location_id,
            name: name,
          });
        }
      }
    }
    await knex(db)("amenities").insert(amenities);
    await knex(db)("truck_services").insert(truck_services);
  } catch (err) {
    console.error("Error inserting ammenities records", err);
  }
};

const seedRestaurantsDB = async () => {
  const restaurants = [];
  try {
    for (const location of locations) {
      const location_id = location.Site.SiteId;
      if (location.Site.Concepts) {
        for (const concept of location.Site.Concepts) {
          const name = concept.Concept.Name;
          restaurants.push({ location_id: location_id, name: name });
        }
      }
    }
    await knex(db)("restaurants").insert(restaurants);
  } catch (err) {
    console.error("Error inserting restaurants records", err);
  }
};

module.exports = { seedLocationsDB, seedAmenitiesDB, seedRestaurantsDB };
