'use strict';

const model = require('../../db/model');
const Q = require('../../db/Q');

test('Model exports setDb', () => {
  expect(typeof model.setDb).toBe('function');
});

test('Model.getProject works', () => {
  const MockedDb = { query: jest.fn() };
  model.setDb(MockedDb);

  model.getProjects(0, 0);
  expect(MockedDb.query.mock.calls[0][0]).toBe(Q.selectProjects);
  expect(MockedDb.query.mock.calls[0][1]).toEqual([0, 0]);

  model.getProjects(5);
  expect(MockedDb.query.mock.calls[1][0]).toBe(Q.selectProjects);
  expect(MockedDb.query.mock.calls[1][1]).toEqual([5, 0]);

  model.getProjects();
  expect(MockedDb.query.mock.calls[2][0]).toBe(Q.selectProjects);
  expect(MockedDb.query.mock.calls[2][1]).toEqual([10, 0]);
});

test('Model.insertProject works', () => {
  const MockedDb = { query: jest.fn() };
  const project = {
    Name: 'Name',
    Url: 'Url',
    Description: 'Description',
    Email: 'Email'
  };
  model.setDb(MockedDb);

  model.insertProject(project);
  expect(MockedDb.query.mock.calls[0][0]).toBe(Q.insertProject);
  expect(MockedDb.query.mock.calls[0][1]).toEqual(['Name', 'Url', 'Description', 'Email']);
});
