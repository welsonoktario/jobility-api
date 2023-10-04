const express = require('express');
const { applicationController } = require('../controllers');

const router = express.Router();

router.get('/', applicationController.findAll);
router.get('/:id', applicationController.find);
router.post('/', applicationController.create);
router.put('/:id', applicationController.update);

module.exports = router;
