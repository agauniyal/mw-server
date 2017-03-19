'use strict';

const http = require('http');
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

test('sets CORS headers', () => {
  const MockedResponse = { setHeader: jest.fn() };
  utils.setCors(MockedResponse);

  const corsHeaders = [
    ['Access-Control-Allow-Origin', '*'],
    ['Access-Control-Allow-Methods', 'GET, POST, OPTIONS'],
    ['Access-Control-Allow-Headers', 'Content-Type, Origin']
  ];

  expect(MockedResponse.setHeader.mock.calls).toEqual(corsHeaders);
});

test('sets response status', () => {
  const MockedResponse = {
    end: jest.fn(),
    statusCode: null,
    statusMessage: null
  };

  utils.setStatus(MockedResponse, 200);
  expect(MockedResponse.end.mock.calls[0]).toEqual(undefined);
  expect(MockedResponse.statusCode).toEqual(200);
  expect(MockedResponse.statusMessage).toEqual(http.STATUS_CODES[200]);

  utils.setStatus(MockedResponse, 400, true);
  expect(MockedResponse.end.mock.calls[0]).toEqual([]);
  expect(MockedResponse.statusCode).toEqual(400);
  expect(MockedResponse.statusMessage).toEqual(http.STATUS_CODES[400]);
});
