'use strict';

var express = require('express');
var controller = require('./peso.controller');

var router = express.Router();

router.get('/:id', controller.index);
router.put('/:id', controller.update);

module.exports = router;