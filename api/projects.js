'use strict';

const url = require('url');
const validator = require('validator');
const normalizeUrl = require('normalize-url');
const db = require('../db/model');
const config = require('../config/config');
const utils = require('../common/utils');
const dbLogger = require('../common/logger').dbLogger;


const get = (req, res) => {
  const query = url.parse(req.url, true).query;
  const limit = parseInt(query.limit);
  const offset = parseInt(query.offset);

  if (isNaN(limit) || isNaN(offset) || limit > 100) {
    return utils.setStatus(res, 400, true);
  }

  db.getProjects(limit, offset).then((result) => {
    utils.setStatus(res, 200);
    return res.end(JSON.stringify({
      version: config.version,
      data: result.rows
    }));
  }).catch((err) => {
    utils.setStatus(res, 500, true);
    return dbLogger.info(err);
  });
};


const post = (req, res) => {

  if (!validator.isURL(req.body.Url, { protocols: ['http', 'https'] })) {
    return utils.setStatus(res, 400, true);
  }

  req.body.Email += '';
  if (req.body.Email.length > 0) {
    if (!validator.isEmail(req.body.Email)) {
      return utils.setStatus(res, 400);
    } else {
      req.body.Url = normalizeUrl(req.body.Url);
    }
  }

  const project = {
    Name: req.body.Name,
    Url: req.body.Url,
    Description: req.body.Description,
    Email: req.body.Email
  };

  db.insertProject(project).then(() => {
    utils.setStatus(res, 200, true);
    return dbLogger.info(project, 'Insert New Project');
  }).catch((err) => {
    utils.setStatus(res, 500, true);
    return dbLogger.info(err);
  });
};

module.exports = {
  get,
  post
};
