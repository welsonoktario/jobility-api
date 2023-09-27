const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

  async function findAll() {
    const jobs = await prisma.job.findMany();
  
    return jobs;
  }

async function find(id) {
  // Parse the `id` parameter as an integer
  const jobId = parseInt(id, 10);

  // Check if `jobId` is a valid integer
  if (isNaN(jobId)) {
    throw new Error('Invalid job ID');
  }

  // Use `jobId` in the query
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
  return prisma.job.update({
    where: {
      id,
    },
    data,
  });
}

async function destroy(id) {
  return prisma.job.delete({
    where: {
      id,
    },
  });
}


module.exports = { 
  findAll, 
  find, 
  create, 
  update, 
  destroy 
};