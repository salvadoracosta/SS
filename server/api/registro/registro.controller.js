'use strict';

var _ = require('lodash');
var bcrypt = require('bcrypt');
var moment = require('moment');

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
    var myDate =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    var data = {
      per_nombre: input.nombre,
      per_correo: input.correo,
      per_hash: hash,
      per_telefono: input.telefono,
      per_institucion: input.institucion,
      per_tipo: input.tipo,
      per_fecha: myDate
    };
    var queryString = 'SELECT * FROM usuario WHERE per_correo =' + connection.escape(data.per_correo) ;
    var query = connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
          debug
          return res.send(409);
          connection.end();
        } else {
          //console.log(result);
          if(result.length>0){
            res.json([{
              msj: 'El correo ya esta registrado, por favor haver login',
              tipo: 'error'
            }]);
            console.log('duplicado');
            connection.end();
          }else{
             var query = connection.query('INSERT INTO usuario SET ?', data, function(err, result) {
              console.log(query);
              if (err) {
                throw err;
                debug
                connection.end();
                return res.send(409);
                
              } else {
                res.json([{
                  msj: 'Registro exitoso, ahora puedes entrar al sistema',
                }]);
                console.log('success');
                connection.end();
              }
            });
          }
        }
      });
   
    console.log(query.sql); // debug
  });


};