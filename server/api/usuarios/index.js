'use strict';

var express = require('express');
var controller = require('./usuarios.controller');

var router = express.Router();

//router.get('/', controller.index);
router.post('/', controller.incert);
module.exports = router;