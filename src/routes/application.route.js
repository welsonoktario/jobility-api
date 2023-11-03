const express = require('express');
const { applicationController } = require('../controllers');
const { authenticated } = require('../middlewares');

const router = express.Router();

router.get('/', authenticated, applicationController.findAll);
router.get('/:id', authenticated, applicationController.find);
router.post('/', authenticated, applicationController.create);
router.put('/:id', authenticated, applicationController.update);

module.exports = router;
