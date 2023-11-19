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

  const disabilities = [
    { value: 1, label: 'Color Blindness' },
    { value: 2, label: 'Partial Blindness' },
    { value: 3, label: 'Full Blindness' },
    { value: 4, label: 'Dyslexia' },
    { value: 5, label: 'Hearing Loss' },
    { value: 6, label: 'Deafness' },
    { value: 7, label: 'Physical Impairment' },
  ];

  disabilities.forEach(async (disability) => {
    await prisma.disability.upsert({
      where: { id: disability.value },
      update: {},
      create: {
        name: disability.label,
      },
    });
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
            location: 'Jakarta, Indonesia',
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
            location: 'Surabaya, Indonesia',
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
            location: 'Surabaya, Indonesia',
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
            location: 'Bandung, Indonesia',
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
            location: 'Bandung, Indonesia',
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
