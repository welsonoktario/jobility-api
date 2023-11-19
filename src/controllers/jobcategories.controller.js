const { jobcategoriesService } = require('../services');

async function findAll(req, res) {
  try {
    const jobcategory = await jobcategoriesService.findAll();

    res.status(200).json({
      status: 'ok',
      msg: 'Successfully retrieved job categories data',
      data: jobcategory,
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
    const jobcategory = await jobcategoriesService.find(id);
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully retrieved a job category data',
      data: {
        jobcategory,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function findjob(req, res) {
  try {
    const { id } = req.params;
    const job = await jobcategoriesService.findjob(id);
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully retrieved a job data by category',
      data: {
        job,
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
    const { name } = req.body;
    const jobcategory = await jobcategoriesService.create({
      name,
    });
    res.status(201).json({
      status: 'ok',
      msg: 'Successfully created a job category',
      data: {
        jobcategory,
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
    const { name } = req.body;
    const jobcategory = await jobcategoriesService.update(id, {
      name,
    });
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully updated a job category',
      data: {
        jobcategory,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    const jobcategory = await jobcategoriesService.destroy(id);
    res.status(200).json({
      status: 'ok',
      msg: 'Successfully deleted a job category',
      data: {
        jobcategory,
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
  findjob,
  create,
  update,
  destroy,
};
