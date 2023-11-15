const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      password: 'password123',
      fullname: 'Alice',
    },
  });

  await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      password: 'password456',
      fullname: 'Bob',
    },
  });

  await prisma.company.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Blue Corp',
    },
  });

  await prisma.company.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Green Company',
    },
  });

  await prisma.disability.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Deafblindness',
    },
  });

  await prisma.jobCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Engineering',
      jobs: {
        create: [
          {
            title: 'Software Engineer',
            description: 'We are looking for a software engineer to join our team.',
            type: 'Fulltime',
            system: 'Onsite',
            location: 'Jakarta, Indonesia',
            salary: 4000000,
            datePosted: new Date(),
            companyId: 1,
            disabilityId: 1,
          },
          {
            title: 'Project Manager',
            description: 'We are looking for a project manager to join our team.',
            type: 'Internship',
            system: 'Remote',
            location: 'Singapore',
            salary: 3000000,
            datePosted: new Date(),
            companyId: 2,
            disabilityId: 1,
          },
        ],
      },
    },
  });

  await prisma.jobCategory.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Accounting',
      jobs: {
        create: [
          {
            title: 'Accountant',
            description: 'We are looking for an accountant to join our team.',
            type: 'Fulltime',
            system: 'Onsite',
            location: 'Jakarta, Indonesia',
            salary: 4000000,
            datePosted: new Date(),
            companyId: 1,
            disabilityId: 1,
          },
          {
            title: 'Financial Analyst',
            description: 'We are looking for a financial analyst to join our team.',
            type: 'Internship',
            system: 'Remote',
            location: 'Singapore',
            salary: 3000000,
            datePosted: new Date(),
            companyId: 2,
            disabilityId: 1,
          },
        ],
      },
    },
  });

  await prisma.jobCategory.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Management',
      jobs: {
        create: [
          {
            title: 'Manager',
            description: 'We are looking for a manager to join our team.',
            type: 'Fulltime',
            system: 'Onsite',
            location: 'Jakarta, Indonesia',
            salary: 4000000,
            datePosted: new Date(),
            companyId: 1,
            disabilityId: 1,
          },
          {
            title: 'Director',
            description: 'We are looking for a director to join our team.',
            type: 'Internship',
            system: 'Remote',
            location: 'Singapore',
            salary: 3000000,
            datePosted: new Date(),
            companyId: 2,
            disabilityId: 1,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
