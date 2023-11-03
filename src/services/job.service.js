const prisma = require('../utils/lib/prisma');

async function findAll(page = 1, pageSize = 12) {
  const job = await prisma.job.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalJobs = await prisma.job.count();
  const totalPages = Math.ceil(totalJobs / pageSize);

  return {
    data: job,
    totalJobs,
    jobsPerPage: pageSize,
    currentPage: page,
    totalPages,
  };
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

async function search(filters, page = 1, pageSize = 12) {
  const whereClause = {};

  if (!filters) return findAll();

  if (filters.title) {
    whereClause.title = {
      contains: filters.title,
    };
  }

  if (filters.companyId) {
    whereClause.companyId = parseInt(filters.companyId, 10);
  }

  if (filters.location) {
    whereClause.location = {
      contains: filters.location,
    };
  }

  if (filters.disabilityId) {
    whereClause.disabilityId = parseInt(filters.disabilityId, 10);
  }

  if (filters.type) {
    whereClause.type = filters.type;
  }

  if (filters.system) {
    whereClause.system = filters.system;
  }

  const job = await prisma.job.findMany({
    where: whereClause,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalJobs = await prisma.job.count();
  const totalPages = Math.ceil(totalJobs / pageSize);

  return {
    data: job,
    totalJobs,
    jobsPerPage: pageSize,
    currentPage: page,
    totalPages,
  };
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
  search,
  create,
  update,
  destroy,
};
