'use strict';

const dbLogger = require('../common/logger').dbLogger;
const Q = require('./Q');


let db = undefined;
const setDb = (instance) => {
  db = instance;
};

const getProjects = (limit = 10, offset = 0) => {
  try {
    return db.prepare(Q.selectProjects).all(limit, offset);
  } catch (err) {
    dbLogger.info(err);
    return null;
  }
};

const insertProject = (project) => {
  try {
    const stmt = db.prepare(Q.insertProject).bind(project);
    stmt.run();
    dbLogger.info(project, 'Insert New Project');
    return true;
  } catch (err) {
    dbLogger.info(err);
    return false;
  }
};

const markVisible = (id, visiblity) => {
  try {
    db.prepare(Q.markVisible).run(visiblity, id);
    return true;
  } catch (err) {
    dbLogger.info(err);
    return false;
  }
};

module.exports = {
  setDb,
  getProjects,
  insertProject,
  markVisible
};
