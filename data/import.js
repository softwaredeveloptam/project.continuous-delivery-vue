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
      const highway_exit_num = location.Site.ExitNumber;
      const street_address = location.Addresses[0].Address1;

      // find main phone and fax number
      const telephone = location.ContactMethods.find(
        (contactMethod) => contactMethod.Type.Name === "Main Phone"
      ).Data;
      const fax = location.ContactMethods.find(
        (contactMethod) => contactMethod.Type.Name === "Fax"
      ).Data;

      const result = await knex(db)("locations").insert({
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
      console.log("result", result);
    }
  } catch (err) {
    console.error("Error inserting locations records", err);
  }
};

// // const seedAmenitiesDB = () => {
// const seedAmenitiesDB = async () => {
//   try {
//     for (const location of locations) {
//       const location_id = location.Site.SiteId;
//       for (const object of location.CustomFields) {
//         const name = object.CustomField.Label;
//         const type = object.CustomField.Section;
//         // insert data into amenities table
//         if (type === "Select Amenities") {
//           // knex(db)("amenities").insert({
//           await knex(db)("amenities").insert({
//             location_id,
//             name,
//           });
//         } else {
//           // insert data into truck_services table
//           // knex(db)("truck_services").insert({
//           await knex(db)("truck_services").insert({
//             location_id,
//             name,
//           });
//         }
//       }
//     }
//   } catch (err) {
//     console.error("Error inserting ammenities records", err);
//   }
// };

// // const seedRestaurantsDB = () => {
// const seedRestaurantsDB = async () => {
//   try {
//     for (const location of locations) {
//       const location_id = location.Site.SiteId;
//       if (location.Site.Concepts) {
//         for (const concept of location.Site.Concepts) {
//           const name = concept.Concept.Name;
//           // knex(db)("restaurants").insert({
//           await knex(db)("restaurants").insert({
//             location_id,
//             name,
//           });
//         }
//       }
//     }
//   } catch (err) {
//     console.error("Error inserting restaurants records", err);
//   }
// };

module.exports = { seedLocationsDB };
