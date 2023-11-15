const express = require('express');
const { companyController } = require('../controllers');

const router = express.Router();

router.get('/', companyController.findAll);
router.get('/:id', companyController.find);
router.post('/', companyController.create);
router.put('/:id', companyController.update);

module.exports = router;
