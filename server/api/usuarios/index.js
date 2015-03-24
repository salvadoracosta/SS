'use strict';

var express = require('express');
var controller = require('./usuarios.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.findOne);
router.post('/', controller.incert);
module.exports = router;