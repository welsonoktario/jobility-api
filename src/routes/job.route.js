const express = require('express');
const { jobController } = require('../controllers');

const router = express.Router();

router.get('/', jobController.findAll);
router.get('/:id', jobController.find);
router.post('/', jobController.create);
router.put('/:id', jobController.update);
router.delete('/:id', jobController.destroy);

module.exports = router;
