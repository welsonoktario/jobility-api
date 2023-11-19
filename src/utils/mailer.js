const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? 'sandbox.smtp.mailtrap.io',
  port: process.env.MAIL_PORT ?? 2525,
  auth: {
    user: process.env.MAIL_USER ?? '',
    pass: process.env.MAIL_PASSWORD ?? '',
  },
});

module.exports = {
  mailer,
};
