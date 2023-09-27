const express = require('express');
const { jobController } = require('../controllers');

const router = express.Router();

router.get('/', jobController.findAll);
router.get('/:id', jobController.find);

module.exports = router;