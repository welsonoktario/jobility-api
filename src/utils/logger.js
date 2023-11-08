const log4js = require('log4js');

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'logs/access.log',
      pattern: '-yyyy-MM-dd',
    },
  },
  categories: {
    default: { appenders: ['access'], level: 'DEBUG' },
  },
});

const logger = log4js.getLogger('http');

module.exports = logger;
