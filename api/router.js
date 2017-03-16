'use strict';

const url = require('url');
const logger = require('morgan')('dev');
const bodyParser = require('body-parser');
const utils = require('../common/utils');
const routerLogger = require('../common/logger').routerLogger;
const jsonParser = bodyParser.json({ limit: 2000 });


const routes = {
  GET: {},
  POST: {}
};


const router = {
  get: (path, callback) => {
    if (utils.isValidParam(path, callback)) {
      routes.GET[path] = callback;
    }
  },
  post: (path, callback) => {
    if (utils.isValidParam(path, callback)) {
      routes.POST[path] = callback;
    }
  },
  setHeaders: (res) => {
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Type', 'application/json');
    utils.setCors(res);
  }
};


const routeRequest = (req, res) => {
  const path = url.parse(req.url).pathname;
  switch (req.method) {
    case 'GET':
      if (path in routes.GET) {
        routes.GET[path](req, res);
      }
      break;
    case 'POST':
      if (path in routes.POST) {
        jsonParser(req, res, (err) => {
          if (err) {
            utils.setStatus(res, 500, true);
            routerLogger.info(err);
          } else {
            routes.POST[path](req, res);
          }
        });
      }
      break;
    case 'OPTIONS':
      return utils.setStatus(res, 204, true);
  }
  return utils.setStatus(res, 404, true);
};


router.requestHandler = (req, res) => {
  router.setHeaders(res);
  logger(req, res, (err) => {
    if (err) {
      utils.setStatus(res, 500, true);
      routerLogger.info(err);
    } else {
      routeRequest(req, res);
    }
  });
};

module.exports = router;
