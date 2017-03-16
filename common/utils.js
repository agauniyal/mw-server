'use strict';

const http = require('http');
const config = require('../config/config');


const safePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return config.port;
  }
  if (port >= 0 && port < 65535) {
    return port;
  }
  return config.port;
};

const isValidParam = (path, callback) => {
  if (Object.prototype.toString.call(path) !== '[object String]' ||
    path.length < 1 || typeof callback !== 'function' || callback.length !== 2) {
    return false;
  } else {
    return true;
  }
};

const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin');
};


const setStatus = (res, status, end = false) => {
  res.statusCode = status;
  res.statusMessage = http.STATUS_CODES[status];
  return end ? res.end() : undefined;
};

module.exports = {
  safePort,
  isValidParam,
  setCors,
  setStatus
};
