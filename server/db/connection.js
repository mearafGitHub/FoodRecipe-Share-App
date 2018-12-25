const monk = require('monk');
const db = monk('localhost/recipetownDB');


module.exports = db;
