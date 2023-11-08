const env = process.env.NODE_ENV.toLocaleLowerCase();
const dotEnv = require('dotenv');

dotEnv.config({
  path: `.env.${env}`, // .env.development or .env.production based on NODE_ENV
});

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { logger } = require('./utils');
const { prisma } = require('./utils/lib');
const {
  authRoutes,
  jobRoutes,
  jobcategoriesRoutes,
  applicationRoutes,
  companyRoutes,
} = require('./routes');

const app = express();
const port = process.env.port || process.env.APP_PORT;
const host = process.env.APP_URL;
const allowedDomains = process.env.ALLOWED_DOMAIN;

// Middlewares
app.use(
  cors({
    allowedHeaders: ['Accept', 'Content-Type'],
    credentials: true,
    origin: allowedDomains ? allowedDomains.split(';') : '*',
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    resave: false,
    saveUninitialized: false,
  }),
);

const { passport } = require('./utils/lib');

app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/auth', authRoutes);
app.use('/job', jobRoutes);
app.use('/categories', jobcategoriesRoutes);
app.use('/application', applicationRoutes);
app.use('/company', companyRoutes);
// ...

prisma
  .$connect()
  .then(() => {
    console.log('Connection has been established successfully.');

    if (env === 'production') {
      app.listen();
    } else {
      app.listen(port, () => {
        console.log(`Server running on: ${host}:${port}`);
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });
