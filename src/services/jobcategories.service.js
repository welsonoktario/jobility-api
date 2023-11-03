const prisma = require('../utils/lib/prisma');

async function findAll() {
  const jobcategories = await prisma.jobCategory.findMany();
  return jobcategories;
}

async function find(id) {
  const jobcategoryId = parseInt(id, 10);

  if (Number.isNaN(jobcategoryId)) {
    throw new Error('Invalid jobcategory ID');
  }

  const jobcategory = await prisma.jobCategory.findFirstOrThrow({
    where: {
      id: jobcategoryId,
    },
  });

  return jobcategory;
}

async function findjob(id) {
  const jobcategoryId = parseInt(id, 10);

  if (Number.isNaN(jobcategoryId)) {
    throw new Error('Invalid Category ID');
  }
  const jobcategory = await prisma.job.findMany({
    where: {
      jobcategoryId,
    },
  });

  return jobcategory;
}

async function create(data) {
  const { name } = data;

  const isExists = await prisma.jobCategory.findFirst({
    where: {
      name,
    },
  });

  if (isExists) {
    throw new Error('Job category already exists');
  }

  const jobcategory = await prisma.jobCategory.create({
    data,
  });

  return jobcategory;
}

async function update(id, data) {
  const jobcategoryId = parseInt(id, 10);

  if (Number.isNaN(jobcategoryId)) {
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
  const jobcategoryId = parseInt(id, 10);

  if (Number.isNaN(jobcategoryId)) {
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
