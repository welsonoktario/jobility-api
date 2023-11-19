const prisma = require('../config/prisma');
const { mailer } = require('../utils');

async function findAll() {
  const applications = await prisma.application.findMany();

  return applications;
}

async function find(id) {
  const applicationId = parseInt(id, 10);

  if (Number.isNaN(applicationId)) {
    throw new Error('Invalid application ID');
  }

  const application = await prisma.application.findFirstOrThrow({
    where: {
      id: applicationId,
    },
  });

  return application;
}

async function create(data) {
  const { jobId, userId } = data;

  const isExists = await prisma.application.findFirst({
    where: {
      jobId,
      userId,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  if (isExists) {
    throw new Error('Application already exists');
  }

  const application = await prisma.application.create({
    data,
    include: {
      user: true,
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  mailer.sendMail({
    // eslint-disable-next-line quotes
    from: `"Jobility" <no-reply@jobility.test>`,
    to: application.job.company.contact,
    subject: 'You have a new job applicant!',
    text: `
      <p>Hi ${application.job.company},</p>

      <p>You have a new job applicant for "${application.job.title}" job.</p>
      <p>The applicant detail is:</p>
      <p>
          Name: ${application.user.fullname}<br>
          Email: ${application.user.email}
      </p>

      Please to contact the applicant's through email provided to<br>
      continue the application process.

      <p>
        Regards,<br>
        Jobility
      </p>
    `,
  });

  return application;
}

async function update(id, data) {
  const applicationId = parseInt(id, 10);

  if (Number.isNaN(applicationId)) {
    throw new Error('Invalid application ID');
  }

  const application = await prisma.application.update({
    where: {
      id: applicationId,
    },
    data,
  });

  return application;
}

module.exports = {
  findAll,
  find,
  create,
  update,
};
