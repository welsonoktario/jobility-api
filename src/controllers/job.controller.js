const { jobService } = require('../services');

async function findAll(req, res) {
  try {
    const job = await jobService.findAll();
    if (job.length === 0) {
      throw new Error('No jobs found');
    } else {
      res.status(200).json({
        status: 'ok',
        msg: 'Successfully retrieved jobs data',
        data: {
          job,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      msg: err.message,
    });
  }
}

async function find(req, res) {
  try {
    const { id } = req.params;
    const job = await jobService.find(id);
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully retrieved a job data',
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      msg: err.message,
    });
  }
}

async function create(req, res) {
  try {
    const {
      title,
      description,
      type,
      system,
      location,
      salary,
      requirement,
      date_posted,
      date_closed,
      jobcategoryId,
      companyId,
    } = req.body;
    const job = await jobService.create({
      title,
      description,
      type,
      system,
      location,
      salary,
      requirement,
      date_posted,
      date_closed,
      jobcategoryId,
      companyId,
    });
    res.status(201).json({
      status: 'ok',
      msg: 'Successfully created a job',
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      msg: err.message,
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      system,
      location,
      salary,
      requirement,
      date_posted,
      date_closed,
      jobcategoryId,
      companyId,
    } = req.body;
    const job = await jobService.update(id, {
      title,
      description,
      type,
      system,
      location,
      salary,
      requirement,
      date_posted,
      date_closed,
      jobcategoryId,
      companyId,
    });
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully updated a job',
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      msg: err.message,
    });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    await jobService.destroy(id);
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully deleted a job',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      msg: err.message,
    });
  }
}

module.exports = {
  findAll,
  find,
  create,
  update,
  destroy,
};