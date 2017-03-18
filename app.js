'use strict';

const http = require('http');
const Pool = require('pg').Pool;
const method = require('./common/utils');
const api = require('./api/router');
const config = require('./config/config');
const projects = require('./api/projects');
const model = require('./db/model');
const Q = require('./db/Q');
const serverLogger = require('./common/logger').serverLogger;


const db = new Pool(config.pgURL);
const port = method.safePort(process.env.PORT || config.port);

api.get('/api/projects', projects.get);
api.post('/api/projects', projects.post);

const server = http.createServer(api.requestHandler);
db.query(Q.createTable).then(() => {
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    model.setDb(db);
    projects.cache.refresh(60000);
  });
}).catch((err) => {
  serverLogger.info(err);
});
