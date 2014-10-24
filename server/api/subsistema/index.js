'use strict';

var express = require('express');
var controller = require('./subsistema.controller');

var router = express.Router();

router.get('/', controller.index); 
router.post('/', controller.registro);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

module.exports = router;