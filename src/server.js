const env = process.env.NODE_ENV;
const dotEnv = require('dotenv');

dotEnv.config({
  path: env ? `.env.${env.toLowerCase()}` : '.env', // .env.development or .env.production based on NODE_ENV, default to .env
});

const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
const allowedDomains = process.env.ALLOWED_DOMAIN;

// Middlewares
app.use(
  cors({
    allowedHeaders: ['Accept', 'Content-Type'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    origin: allowedDomains ? allowedDomains.split(';') : '*',
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      domain: 'technivine.com',
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
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
    if (env === 'production') {
      app.listen();
    } else {
      app.listen(port);
    }
  })
  .catch((err) => {
    throw new Error(err.message);
  });
