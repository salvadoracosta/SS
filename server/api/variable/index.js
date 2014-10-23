'use strict';

var express = require('express');
var controller = require('./variable.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.incert);
module.exports = router;