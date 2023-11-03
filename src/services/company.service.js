const prisma = require('../utils/lib/prisma');

async function create(data) {
  const { name } = data;

  const isExists = await prisma.company.findFirst({
    where: {
      name,
    },
  });

  if (isExists) {
    throw new Error('Company already exists');
  }

  const company = await prisma.company.create({
    data,
  });

  return company;
}

async function findAll() {
  const companies = await prisma.company.findMany();

  return companies;
}

async function find(id) {
  const companyId = parseInt(id, 10);

  if (Number.isNaN(companyId)) {
    throw new Error('Invalid company ID');
  }

  const company = await prisma.company.findFirstOrThrow({
    where: {
      id: companyId,
    },
  });

  return company;
}

async function update(id, data) {
  const companyId = parseInt(id, 10);

  if (Number.isNaN(companyId)) {
    throw new Error('Invalid company ID');
  }

  const company = await prisma.company.update({
    where: {
      id: companyId,
    },
    data,
  });

  return company;
}

module.exports = {
  create,
  findAll,
  find,
  update,
};
