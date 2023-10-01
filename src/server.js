const dotEnv = require('dotenv');

dotEnv.config();

const express = require('express');
const cors = require('cors');
const { logger } = require('./utils');
const { prisma } = require('./config');
const { authRoutes, jobRoutes, jobcategoriesRoutes } = require('./routes');

const app = express();

// Middlewares
app.use(
  cors({
    allowedHeaders: '*',
    origin: '*',
  }),
);
app.use(express.json());
app.use(logger);

// Routing
app.use('/auth', authRoutes);
app.use('/job', jobRoutes);
app.use('/categories', jobcategoriesRoutes);
// ...

prisma
  .$connect()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server running on: http://localhost:${process.env.APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
