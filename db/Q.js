'use strict';

const createTable = [
  'CREATE TABLE IF NOT EXISTS Projects(',
  '`Id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,',
  '`Name` CHAR(70) NOT NULL DEFAULT " ",',
  '`Url` CHAR(200) NOT NULL DEFAULT " ",',
  '`Description` CHAR(500) NOT NULL DEFAULT " ",',
  '`Email` CHAR(255) NOT NULL DEFAULT " ",',
  '`Visible` INTEGER NOT NULL DEFAULT 0',
  ');'
].join(' ');

const selectProjects = 'SELECT Id, Name, Url, Description FROM Projects WHERE Visible = 1 LIMIT (?) OFFSET(?)';
const insertProject = 'INSERT INTO Projects VALUES (NULL, :Name, :Url, :Description, :Email, 0)';
const markVisible = 'UPDATE Projects SET Visible = (?) WHERE Id = (?)';

module.exports = {
  createTable,
  selectProjects,
  insertProject,
  markVisible
};
