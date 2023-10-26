const { jobService } = require('../services');

async function findAll(req, res) {
  try {
    const job = await jobService.findAll();
    if (job.length === 0) {
      throw new Error('No jobs found');
    } else {
      res.status(200).json({
        status: 'ok',
        data: job,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get all jobs',
    });
  }
}

async function find(req, res) {
  try {
    const { id } = req.params;
    const job = await jobService.find(id);
    res.status(200).json({
      status: 'ok',
      data: job,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get a job',
    });
  }
}

async function search(req, res) {
  try {
    const filters = req.query;
    const job = await jobService.search(filters);
    res.status(200).json({
      status: 'ok',
      data: job,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: `Failed to search jobs. msg: ${err.message}`,
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
      datePosted,
      dateClosed,
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
      datePosted,
      dateClosed,
      jobcategoryId,
      companyId,
    });
    res.status(201).json({
      status: 'ok',
      data: job,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create a job',
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
      datePosted,
      dateClosed,
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
      datePosted,
      dateClosed,
      jobcategoryId,
      companyId,
    });
    res.status(200).json({
      status: 'ok',
      data: job,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update a job',
    });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    await jobService.destroy(id);
    res.status(200).json({
      status: 'ok',
      message: 'Successfully deleted a job',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete a job',
    });
  }
}

module.exports = {
  findAll,
  find,
  search,
  create,
  update,
  destroy,
};
