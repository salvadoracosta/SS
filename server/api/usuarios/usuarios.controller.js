'use strict';

var _ = require('lodash');
var bcrypt = require('bcrypt');
// Get list of usuarioss, unused
exports.index = function(req, res) {
  res.json([]);
};

exports.incert = function(req, res) {

  var input = JSON.parse(JSON.stringify(req.body));

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'nancy'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.query("use ss");
  console.log(input);
  bcrypt.hash(input.password, 8, function(err, hash) {
    console.log(hash);
    var data = {
      nombre    : input.nombre,
      correo    : input.correo,
      hash     : hash,
      telefono     : input.telefono,
      institucion :  input.institucion
    };
    var query = connection.query('INSERT INTO usuario SET ?', data, function(err, result) {
    console.log(query);
    if(err) {
      throw err; debug
      return res.send(409);
      connection.end();
    }else{
      res.json([{
        msj : 'Registro exitoso, ahora puedes entrar al sistema',
      }]);
      console.log( 'success' );
      connection.end();
    }
    });
    console.log(query.sql); // debug
    });
     
    
};