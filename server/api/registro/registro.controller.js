'use strict';

var _ = require('lodash');
var bcrypt = require('bcrypt');

exports.incert = function(req, res) {

  var input = JSON.parse(JSON.stringify(req.body));

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.query("use mydb");
  console.log(input);
  bcrypt.hash(input.password, 8, function(err, hash) {
    console.log(hash);
    var data = {
      per_nombre: input.nombre,
      per_correo: input.correo,
      per_hash: hash,
      per_telefono: input.telefono,
      per_institucion: input.institucion,
      per_tipo: input.tipo
    };
    var query = connection.query('INSERT INTO usuario SET ?', data, function(err, result) {
      console.log(query);
      if (err) {
        throw err;
        debug
        return res.send(409);
        connection.end();
      } else {
        res.json([{
          msj: 'Registro exitoso, ahora puedes entrar al sistema',
        }]);
        console.log('success');
        connection.end();
      }
    });
    console.log(query.sql); // debug
  });


};