'use strict';

var express = require('express');
var controller = require('./variable.controller');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);
router.post('/', controller.registro);
module.exports = router;