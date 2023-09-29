const prisma = require('../config/prisma');

async function findAll() {
  const jobcategories = await prisma.jobCategory.findMany();
  return jobcategories;
}

async function find(id) {
  // Parse the `id` parameter as an integer
  const jobcategoryId = parseInt(id);

  // Check if `jobcategoryId` is a valid integer
  if (isNaN(jobcategoryId)) {
    throw new Error('Invalid jobcategory ID');
  }

  // Use `jobcategoryId` in the query
  const jobcategory = await prisma.jobCategory.findFirstOrThrow({
    where: {
      id: jobcategoryId,
    },
  });

  return jobcategory;
}

async function findjob(id) {
  const jobcategoryId = parseInt(id);

  if (isNaN(jobcategoryId)) {
    throw new Error('Invalid Category ID');
  }
  const jobcategory = await prisma.job.findMany({ 
    where: {
      jobcategoryId: jobcategoryId,
    },
  });

  return jobcategory;
}

async function create(data) {
  const jobcategory = await prisma.jobCategory.create({
    data,
  });

  return jobcategory;
}

async function update(id, data) {
  const jobcategoryId = parseInt(id);

  if (isNaN(jobcategoryId)) {
    throw new Error('Invalid jobcategory ID');
  }
  const jobcategory = await prisma.jobCategory.update({
    where: {
      id: jobcategoryId,
    },
    data,
  });
  return jobcategory;
}

async function destroy(id) {
  const jobcategoryId = parseInt(id);

  if (isNaN(jobcategoryId)) {
    throw new Error('Invalid jobcategory ID');
  }
  const jobcategory = await prisma.jobCategory.delete({
    where: {
      id: jobcategoryId,
    },
  });

  return jobcategory;
}

module.exports = {
  findAll,
  find,
  findjob,
  create,
  update,
  destroy,
};