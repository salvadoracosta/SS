'use strict';

var express = require('express');
var controller = require('./variable.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getVariablesById);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);
router.post('/', controller.registro);
router.post('/:id', controller.registroById);
module.exports = router;