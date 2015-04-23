'use strict';

var express = require('express');
var controller = require('./funcion.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.funionesByIdProyecto);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);
router.post('/', controller.registro);
module.exports = router;