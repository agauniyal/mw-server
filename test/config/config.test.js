'use strict';

const config = require('../../config/config');

test('Default Port Number', () => {
  expect(config.port).toBe(3000);
});

test('Current api version', () => {
  expect(config.version).toBe('0.1');
});

test('Logging Service Token', () => {
  expect(config.LE_TOKEN).toBe('LOG_TOKEN');
});

test('Database Path', () => {
  const dbObj = {
    'database': 'NAME',
    'host': 'host',
    'password': 'PASS',
    'port': '1234',
    'user': 'USER'
  };
  expect(config.pgURL).toEqual(dbObj);
});
