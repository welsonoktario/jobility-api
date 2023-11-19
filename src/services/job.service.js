const prisma = require('../config/prisma');

async function findAll(page = 1, pageSize = 12, orderBy = null) {
  const job = await prisma.job.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      company: true,
      disability: true,
      jobcategory: true,
    },
    orderBy,
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
    include: {
      company: true,
      disability: true,
      jobcategory: true,
    },
  });

  return job;
}

async function search(filters, page = 1, pageSize = 12, sortBy = null) {
  const whereClause = {};

  if (!filters) return findAll();

  if (filters.query) {
    whereClause.title = { contains: filters.query };
  }

  if (filters.location) {
    whereClause.location = {
      contains: filters.location,
    };
  }

  if (filters.specialization) {
    whereClause.jobcategoryId = {
      equals: Number(filters.specialization),
    };
  }

  if (filters.disabilities) {
    whereClause.disabilityId = {
      in: filters.disabilities.split(',').map((val) => Number(val)),
    };
  }

  if (filters.jobTypes) {
    whereClause.type = {
      in: filters.jobTypes.split(','),
    };
  }

  if (filters.jobSystems) {
    whereClause.system = {
      in: filters.jobSystems.split(','),
    };
  }

  const job = await prisma.job.findMany({
    where: whereClause,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      company: true,
      disability: true,
      jobcategory: true,
    },
    orderBy: sortBy,
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
