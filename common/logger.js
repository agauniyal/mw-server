'use strict';

const bunyan = require('bunyan');
const LE = require('le_node');
const config = require('../config/config');


const LEStream = LE.bunyanStream({
  token: config.LE_TOKEN,
  withStack: true
});


const Logger = bunyan.createLogger({
  name: 'MW',
  stream: LEStream.stream,
  level: 'fatal'
});

const routerLogger = bunyan.createLogger({
  name: 'MW_ROUTER',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  },
  stream: LEStream.stream
});

module.exports = {
  Logger,
  routerLogger
};
