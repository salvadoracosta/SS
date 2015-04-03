'use strict';

var _ = require('lodash');
var bcrypt = require('bcrypt');
// Get list of usuarioss, unused
exports.index = function(req, res) {

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
    //console.log('connected as id ' + connection.threadId);
  });

  connection.query("use mydb");

  var query = connection.query('SELECT * FROM usuario', function(err, result) {
      if (err) {
       // throw err;
        debug
        return res.send(409);
        connection.end();
      } else {
        res.json(result);
        //console.log( 'success' );
        connection.end();
      }
    });

    // res.json([]);

  };



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

   exports.update = function(req, res) {

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
    bcrypt.hash(input.user.per_password, 8, function(err, hash) {
      console.log(hash);
      var data = {
        per_id: req.params.id,
        per_nombre: input.user.per_nombre,
        per_correo: input.user.per_correo,
        per_hash: hash,
        per_telefono: input.user.per_telefono,
        per_institucion: input.user.per_institucion
      };
      var queryString = 'UPDATE usuario SET per_nombre = '+connection.escape(data.per_nombre)+', per_correo= '+connection.escape(data.per_correo)+', per_hash= '+connection.escape(data.per_hash)+', per_telefono= '+connection.escape(data.per_telefono)+', per_institucion= '+connection.escape(data.per_institucion)+' WHERE per_id=' + connection.escape(data.per_id) ;
      var query = connection.query(queryString, function(err, result) {
            if (err) {
              throw err;
              debug
              return res.send(409);
              connection.end();
            } else {
              console.log(queryString);
              res.json([{
                      msj : 'El perfil fue editado exitosamente',
                    }]);
              //console.log( 'success' );
              connection.end();
            }
          });
      //console.log(query.sql); // debug
    });


  };