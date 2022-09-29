// check the spotify API for requested information that is not found in local database
const db = require('../../database/index');

const updateCountry = (countryName, iso, num) => (
  // eslint-disable-next-line no-promise-executor-return
  new Promise(() => db.query(`INSERT INTO stats (country, country_iso, track_hits) VALUES ('${countryName}','${iso}', '${num}') ON DUPLICATE KEY UPDATE track_hits=track_hits+1;`))
);

const findTraffic = (country) => {
  console.log('models country: ', country);
  // eslint-disable-next-line no-promise-executor-return
  return db.promise().query(`SELECT track_hits FROM stats WHERE country = '${country}';`);
};

module.exports = {
  update: updateCountry,
  find: findTraffic,
};

// ON DUPLICATE KEY UPDATE track_hits=track_hits+1;
