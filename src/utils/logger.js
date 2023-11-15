const path = require('path');
const fs = require('fs');
const pino = require('pino');

const logDirectory = './logs';

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

function formatDateAndTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');

  const formattedDateAndTime = `${year}${month}${day}-${hours}`;

  return formattedDateAndTime;
}

const transport = pino.transport({
  targets: [
    {
      level: 'trace',
      target: 'pino-pretty',
      options: {
        destination: path.join(logDirectory, `${formatDateAndTime()}.log`),
        colorize: false,
        ignore: 'reqId',
      },
    },
    {
      level: 'trace',
      target: 'pino-pretty',
      options: { destination: 1, colorize: true, ignore: 'reqId' },
    },
  ],
});

const logger = require('pino-http')({
  logger: pino(transport),
  useLevel: 'info',
  quietReqLogger: true,
});

module.exports = logger;
