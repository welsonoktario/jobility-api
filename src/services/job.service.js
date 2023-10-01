const prisma = require('../config/prisma');

async function findAll() {
  const jobs = await prisma.job.findMany();
  return jobs;
}

async function find(id) {
  const jobId = parseInt(id, 10);

  if (Number.isNaN(jobId)) {
    throw new Error('Invalid job ID');
  }

  const job = await prisma.job.findFirstOrThrow({
    where: {
      id: jobId,
    },
  });

  return job;
}

async function create(data) {
  const job = await prisma.job.create({
    data,
  });

  return job;
}

async function update(id, data) {
  const jobId = parseInt(id, 10);

  if (Number.isNaN(jobId)) {
    throw new Error('Invalid job ID');
  }
  const job = await prisma.job.update({
    where: {
      id: jobId,
    },
    data,
  });
  return job;
}

async function destroy(id) {
  const jobId = parseInt(id, 10);

  if (Number.isNaN(jobId)) {
    throw new Error('Invalid job ID');
  }
  const job = await prisma.job.delete({
    where: {
      id: jobId,
    },
  });
  return job;
}

module.exports = {
  findAll,
  find,
  create,
  update,
  destroy,
};
