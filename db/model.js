'use strict';

const Q = require('./Q');


let db = undefined;
const setDb = (instance) => {
  db = instance;
};

const getProjects = (limit = 10, offset = 0) => {
  return db.query(Q.selectProjects, [limit, offset]);
};

const insertProject = (project) => {
  return db.query(Q.insertProject, [project.Name, project.Url, project.Description, project.Email]);
};

module.exports = {
  setDb,
  getProjects,
  insertProject
};
