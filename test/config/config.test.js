'use strict';

const config = require('../../config/config');

test('Default Port Number', () => {
  expect(config.port).toBe(3000);
});

test('Default Database Name', () => {
  expect(config.dbName).toBe('mw-projects.db');
});

test('Current api version', () => {
  expect(config.version).toBe('0.1');
});
