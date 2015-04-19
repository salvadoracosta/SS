'use strict';

var express = require('express');
var controller = require('./struct.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getStructById);
module.exports = router;