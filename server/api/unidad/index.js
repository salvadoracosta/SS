'use strict';

var express = require('express');
var controller = require('./unidad.controller');

var router = express.Router();

router.get('/:id', controller.getByProyecto);
router.get('/:id/unidadesindependeientes', controller.getUniddadesIndependientes);
router.post('/consultaporvariablesindependientes', controller.getUniddadesByVariablesIndependientes);
router.post('/:id', controller.registroById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
module.exports = router;