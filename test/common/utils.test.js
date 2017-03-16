'use strict';

const utils = require('../../common/utils');
const config = require('../../config/config');

test('returns safe Port Number', () => {
  expect(utils.safePort(5000)).toBe(5000);
  expect(utils.safePort(500000)).toBe(config.port);
  expect(utils.safePort(-1)).toBe(config.port);
  expect(utils.safePort('24000')).toBe(24000);
  expect(utils.safePort('abc')).toBe(config.port);
});

test('isValidParameters for callback', () => {
  expect(utils.isValidParam(1, () => { return 1; })).toBe(false);
  expect(utils.isValidParam(1, (a) => { return a; })).toBe(false);
  expect(utils.isValidParam(1, (a, b) => { return a + b; })).toBe(false);
  expect(utils.isValidParam('', (a, b) => { return a + b; })).toBe(false);

  expect(utils.isValidParam('/', () => { return 1; })).toBe(false);
  expect(utils.isValidParam('/', (a) => { return a; })).toBe(false);
  expect(utils.isValidParam('/', (a, b, c) => { return a + b + c; })).toBe(false);

  expect(utils.isValidParam('/', (a, b) => { return a + b; })).toBe(true);
});
