'use strict';

const dbName = 'mw-projects.db';
const version = '0.1';
const port = 3000;
const LE_TOKEN = process.env.LE_TOKEN;

module.exports = {
  dbName,
  version,
  port,
  LE_TOKEN
};
