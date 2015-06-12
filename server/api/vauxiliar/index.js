'use strict';

var express = require('express');
var controller = require('./vauxiliar.controller');

var router = express.Router();

router.post('/:id', controller.registroById); 
router.get('/:id', controller.variablesById);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

module.exports = router;