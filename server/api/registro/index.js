'use strict';

var express = require('express');
var controller = require('./registro.controller');

var router = express.Router();

router.post('/', controller.incert);
module.exports = router;