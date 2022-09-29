// check the local database for requested information
const lookup = require('../models/model');

const incrementCountry = (countryName, iso, num) => (
  lookup.update(countryName, iso, num)
);

const findCountry = (countryName) => (
  lookup.find(countryName)
);

module.exports = {
  increment: incrementCountry,
  find: findCountry,
};
