'use strict';

var express = require('express');
var controller = require('./proyecto.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.registro);

module.exports = router;