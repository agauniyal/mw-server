'use strict';

const url = require('url');
const validator = require('validator');
const normalizeUrl = require('normalize-url');
const db = require('../db/model');
const config = require('../config/config');
const utils = require('../common/utils');
const Logger = require('../common/logger').Logger;


const cache = {
  cachedRows: [],
  limit: 100,
  offset: 0,
  updating: false,
  updateRows: (limit, offset) => {
    db.getProjects(limit, offset).then((result) => {
      cache.cachedRows = result.rows;
    }).catch((err) => {
      Logger.info(err);
    });
  },
  getRows: (limit, offset) => {
    return cache.cachedRows.slice(offset, offset + limit);
  },
  refresh: (interval) => {
    if (cache.updating) {
      return;
    }
    cache.updating = true;
    cache.updateRows(cache.limit, cache.offset);
    setInterval(() => {
      cache.updateRows(cache.limit, cache.offset);
    }, interval);
  }
};


const get = (req, res) => {
  const query = url.parse(req.url, true).query;
  const limit = parseInt(query.limit);
  const offset = parseInt(query.offset);

  if (isNaN(limit) || isNaN(offset) || limit > 100 || limit < 0 || offset < 0) {
    return utils.setStatus(res, 400, true);
  }

  if (limit + offset < 100) {
    utils.setStatus(res, 200);
    return res.end(JSON.stringify({
      version: config.version,
      data: cache.getRows(limit, offset)
    }));
  } else {
    db.getProjects(limit, offset).then((result) => {
      utils.setStatus(res, 200);
      return res.end(JSON.stringify({
        version: config.version,
        data: result.rows
      }));
    }).catch((err) => {
      utils.setStatus(res, 500, true);
      return Logger.info(err);
    });
  }
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
    return Logger.info(project, 'Insert New Project');
  }).catch((err) => {
    utils.setStatus(res, 500, true);
    return Logger.info(err);
  });
};

module.exports = {
  get,
  post,
  cache
};
