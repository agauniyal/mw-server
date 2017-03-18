'use strict';

const parse = require('pg-connection-string').parse;

const version = '0.1';
const port = 3000;

const LE_TOKEN = process.env.LE_TOKEN;
const pgURL = parse(process.env.DB_PATH);

module.exports = {
  pgURL,
  version,
  port,
  LE_TOKEN
};
