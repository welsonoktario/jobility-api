const { applicationService } = require('../services');

async function findAll(req, res) {
  try {
    const applications = await applicationService.findAll();

    if (applications.length === 0) {
      throw new Error('No applications found');
    }

    res.status(200).json({
      status: 'ok',
      msg: 'Successfully retrieved applications data',
      data: {
        applications,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function find(req, res) {
  try {
    const { id } = req.params;
    const application = await applicationService.find(id);
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully retrieved a application data',
      data: {
        application,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function create(req, res) {
  try {
    const { jobId, userId, status, dateApplied, coverLetter } = req.body;
    const application = await applicationService.create({
      jobId,
      userId,
      status,
      coverLetter,
      dateApplied,
    });
    res.status(201).json({
      status: 'ok',
      msg: 'Successfully created an application',
      data: {
        application,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { jobId, userId, status } = req.body;
    const application = await applicationService.update(id, {
      jobId,
      userId,
      status,
    });
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully updated an application',
      data: {
        application,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

module.exports = {
  findAll,
  find,
  create,
  update,
};
