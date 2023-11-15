const prisma = require('../config/prisma');
const { exclude } = require('../utils');

async function findAll() {
  const users = await prisma.user.findMany();

  return users;
}

async function find(id) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  return exclude(user, ['password', 'createdAt', 'updatedAt', 'deletedAt']);
}

async function findByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

async function create(data) {
  const user = await prisma.user.create({
    data,
  });

  return exclude(user, ['password', 'createdAt', 'updatedAt', 'deletedAt']);
}

async function update(id, data) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

async function destroy(id) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  findAll,
  find,
  findByEmail,
  create,
  update,
  destroy,
};
