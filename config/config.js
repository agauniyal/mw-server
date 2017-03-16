'use strict';

const version = '0.1';
const port = 3000;

const LE_TOKEN = process.env.LE_TOKEN;

const pgURL = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE
};

module.exports = {
  pgURL,
  version,
  port,
  LE_TOKEN
};
