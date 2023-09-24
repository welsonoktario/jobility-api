const pino = require('pino');
const pretty = require('pino-pretty');

// Create a logging instance
const logger = require('pino-http')({
  logger: pino(
    pretty({
      colorize: true,
    }),
  ),
  useLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

module.exports = logger;
