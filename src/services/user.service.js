const prisma = require('../config/prisma');

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

  return user;
}

async function findByEmail(email) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
  });

  return user;
}

async function create(data) {
  const user = await prisma.user.create({
    data,
  });

  return user;
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
