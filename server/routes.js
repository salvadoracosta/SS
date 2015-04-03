/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below

  app.use('/api/modulos', require('./api/modulo'));
  app.use('/api/subsistemas', require('./api/subsistema'));
  app.use('/api/proyectos', require('./api/proyecto'));
  app.use('/login', require('./api/login'));

  app.use('/api/variables', require('./api/variable'));
  app.use('/api/usuarios', require('./api/usuarios'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/funciones', require('./api/funcion'));
  app.use('/api/pesos', require('./api/peso'));
 // app.use('/api/vindependientes',require('./api/vindependiente'));
  app.use('/api/tree', require('./api/tree'));
  app.use('/api/unidad', require('./api/unidad'));
  app.use('/registro', require('./api/registro'));

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
