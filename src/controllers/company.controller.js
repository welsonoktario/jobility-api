const { companyService } = require('../services');

async function findAll(req, res) {
  try {
    const companies = await companyService.findAll();

    if (companies.length === 0) {
      throw new Error('No companies found');
    }

    res.status(200).json({
      status: 'ok',
      companies,
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
    const company = await companyService.find(id);
    res.status(200).json({
      status: 'ok',
      company,
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
    const company = await companyService.create({
      name,
    });
    res.status(201).json({
      status: 'ok',
      company,
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
    const company = await companyService.update(id, {
      name,
    });
    res.status(200).json({
      status: 'ok',
      company,
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
