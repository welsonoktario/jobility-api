const { jobService } = require('../services');

async function findAll(req, res) {
  try {
    const filters = req.query;
    const page = parseInt(filters.page, 10) || 1;
    const pageSize = parseInt(filters.pageSize, 10) || 12;
    const sortBy = filters.sortBy || { datePosted: 'desc' };

    const job = await jobService.search(filters, page, pageSize, sortBy);

    return res.status(200).json({
      status: 'ok',
      data: {
        data: job.data,
        totalData: job.totalJobs,
        dataPerPage: job.jobsPerPage,
        currentPage: job.currentPage,
        totalPages: job.totalPages,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      message: `Failed to search jobs. msg: ${err.message}`,
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
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get a job',
    });
  }
}

async function search(req, res) {
  try {
    const filters = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 12;

    const job = await jobService.search(filters, page, pageSize);
    if (job.data.length === 0) {
      throw new Error('No jobs found');
    } else {
      res.status(200).json({
        status: 'ok',
        data: {
          data: job.data,
          totalData: job.totalJobs,
          dataPerPage: job.jobsPerPage,
          currentPage: job.currentPage,
          totalPages: job.totalPages,
        },
      });
    }
  } catch (err) {
    console.error(err);
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
      jobcategory: {
        connect: { id: jobcategoryId },
      },
      company: {
        connect: { id: companyId },
      },
    });
    res.status(201).json({
      status: 'ok',
      data: job,
    });
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(err);
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
