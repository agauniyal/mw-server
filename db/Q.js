'use strict';

const createTable = [
  'CREATE TABLE IF NOT EXISTS Projects(',
  'Id SERIAL NOT NULL PRIMARY KEY UNIQUE,',
  'Name VARCHAR(70) NOT NULL,',
  'Url VARCHAR(200) NOT NULL UNIQUE,',
  'Description VARCHAR(400) NOT NULL,',
  'Email VARCHAR(255) NOT NULL,',
  'Visible BOOLEAN NOT NULL DEFAULT FALSE',
  ');'
].join(' ');

const selectProjects = 'SELECT Id, Name, Url, Description FROM Projects WHERE Visible = TRUE LIMIT ($1) OFFSET($2)';
const insertProject = 'INSERT INTO Projects VALUES (DEFAULT, $1, $2, $3, $4, FALSE)';

module.exports = {
  createTable,
  selectProjects,
  insertProject
};
