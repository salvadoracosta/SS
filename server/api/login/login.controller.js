'use strict';

var _ = require('lodash');
var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jwt-simple');
var jwtTokenSecret = 'YOUR_SECRET_STRING';

// Get list of logins
exports.index = function(req, res) {
  res.json([]);
};

exports.checkLogIn = function(req, res) {

  var input = JSON.parse(JSON.stringify(req.body));

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin'
  });

  connection.connect(function(err) {

    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
     //console.log('connected as id ' + connection.threadId);
  });

  var data = {
    correo    : input.correo,
    password     : input.password,
  };
  
    connection.query("use mydb");
    console.log(input);
    var queryString = 'SELECT * FROM usuario WHERE per_correo =' + connection.escape(data.correo) ;
    var query = connection.query(queryString, function(err, result) {

    if(err) {
      throw err;
      return res.send(409);
      connection.end();
    }else{
      //sin error en la consulta, ahora verficamos si existe alguien con ese correo
      var user = result[0];
          if(result[0]){
            console.log(result[0].per_hash);
          bcrypt.compare(data.password, result[0].per_hash, function(err, answer) {
           if(answer){
              var expires = moment().add(7,'days').valueOf();
              var token = jwt.encode({
                iss: user.per_id,
                exp: expires
              }, jwtTokenSecret);
               
              res.json({
                msj : 'success',
                token : token,
                expires: expires,
                user: user
              });
           }else{
              res.json([{
                  msj : 'error',
                }]);
           }
        });
          }else{
            //No existe nadie con ese correo
            res.json([{
              msj : 'error',
            }]);
          }
        connection.end();
      }
    });
    console.log(query.sql); // debug
};