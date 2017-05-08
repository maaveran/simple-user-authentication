// set up pg-promise ==================================================
const path = require('path');
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, 'config', 'config.json'))[env];
const Promise = require('bluebird');

const cn = {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.username,
    password: config.password
};

const options = {
    promiseLib: Promise
};

const pgp = require('pg-promise')(options);

module.exports.db = pgp(cn);
module.exports.config = config;