'use strict';

var express = require('express');
var controller = require('./tree.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getTreeById);
module.exports = router;