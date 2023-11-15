const prisma = require('../config/prisma');

async function findAll() {
  const applications = await prisma.application.findMany();

  return applications;
}

async function find(id) {
  const applicationId = parseInt(id, 10);

  if (Number.isNaN(applicationId)) {
    throw new Error('Invalid application ID');
  }

  const application = await prisma.application.findFirstOrThrow({
    where: {
      id: applicationId,
    },
  });

  return application;
}

async function create(data) {
  const { jobId, userId } = data;

  const isExists = await prisma.application.findFirst({
    where: {
      jobId,
      userId,
    },
  });

  if (isExists) {
    throw new Error('Application already exists');
  }

  const application = await prisma.application.create({
    data,
  });

  return application;
}

async function update(id, data) {
  const applicationId = parseInt(id, 10);

  if (Number.isNaN(applicationId)) {
    throw new Error('Invalid application ID');
  }

  const application = await prisma.application.update({
    where: {
      id: applicationId,
    },
    data,
  });

  return application;
}

module.exports = {
  findAll,
  find,
  create,
  update,
};
