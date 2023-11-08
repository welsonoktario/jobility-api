const log4js = require('log4js');

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'logs/access.log',
      pattern: '-yyyy-MM-dd',
      category: 'http',
    },
    app: {
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    console: { type: 'console' },
    errorFile: {
      type: 'file',
      filename: 'logs/errors.log',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: { appenders: ['app', 'errors'], level: 'DEBUG' },
    http: { appenders: ['access'], level: 'DEBUG' },
    console: { appenders: ['console'], level: 'info' },
  },
});

const httpLogger = log4js.getLogger('http');
const consoleLogger = log4js.getLogger('console');

module.exports = {
  httpLogger,
  consoleLogger,
};
