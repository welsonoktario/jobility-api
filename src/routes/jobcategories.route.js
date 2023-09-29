const express = require('express');
const { jobcategoriesController } = require('../controllers');

const router = express.Router();

router.get('/', jobcategoriesController.findAll);
router.get('/:id', jobcategoriesController.find);
router.get('/job/:id', jobcategoriesController.findjob);
router.post('/', jobcategoriesController.create);
router.put('/:id', jobcategoriesController.update);
router.delete('/:id', jobcategoriesController.destroy);

module.exports = router;
