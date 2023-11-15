const express = require('express');
const { applicationController } = require('../controllers');
const verifyToken = require('../utils/verifyJwt');

const router = express.Router();

router.get('/', applicationController.findAll);
router.get('/:id', applicationController.find);
router.post('/', verifyToken, applicationController.create);
router.put('/:id', verifyToken, applicationController.update);

module.exports = router;
