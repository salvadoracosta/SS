'use strict';

var express = require('express');
var controller = require('./unidad.controller');

var router = express.Router();

router.get('/:id', controller.getByProyecto);
router.post('/:id', controller.registroById);
module.exports = router;