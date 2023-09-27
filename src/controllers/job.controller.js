const { jobService } = require('../services');

async function findAll(req, res) {
  try {
    const jobs = await jobService.findAll();
    res.status(200).json({
      status: 'ok',
      data: {
        jobs,
      },
    });
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

module.exports = { 
  findAll, 
  find 
};