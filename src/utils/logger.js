const log4js = require('log4js');

log4js.configure({
  disableClustering: true,
  appenders: {
    access: {
      type: 'dateFile',
      base: 'logs/access.log',
      pattern: '-yyyy-MM-dd',
      category: 'http',
    },
    app: {
      type: 'dateFile',
      filename: 'logs/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    errorFile: {
      type: 'dateFile',
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
  },
});

const logger = log4js.getLogger('http');

module.exports = logger;
