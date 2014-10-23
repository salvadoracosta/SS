'use strict';

var _ = require('lodash');

// Get list of subsistemas
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
  	var query = connection.query('SELECT * FROM subsistema', function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	        res.json(result);
	        //console.log( 'success' );
	        connection.end();
	      }
	    });
  }

exports.registro = function(req, res) {

	var input = JSON.parse(JSON.stringify(req.body));

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'nancy'
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

	var data = {
		sub_nombre: input.nombre,
		sub_sigla: input.sigla,
		sub_valor: input.valor
	};
	var query = connection.query('INSERT INTO subsistema SET ?', data, function(err, result) {

			if (err) {
				throw err; debug
				return res.send(500);
				connection.end();
			} else {
				res.json([{
					msj: 'Registro del subsistema exitoso',
				}]);
				console.log('success');
				connection.end();
			}

			console.log(query.sql); // debug
		});

	};
