'use strict';

const http = require('http');
const Database = require('better-sqlite3');
const method = require('./common/utils');
const api = require('./api/router');
const config = require('./config/config');
const projects = require('./api/projects');
const model = require('./db/model');
const Q = require('./db/Q');
const serverLogger = require('./common/logger').serverLogger;


const port = method.safePort(process.env.PORT || config.port);

api.get('/api/projects', projects.get);
api.post('/api/projects', projects.post);

const server = http.createServer(api.requestHandler);

server.listen(port, (err) => {
  const db = new Database(config.dbName);
  if (err) {
    db.close();
    serverLogger.info(err);
  } else {
    db.prepare(Q.createTable).run();
    model.setDb(db);
  }
});
