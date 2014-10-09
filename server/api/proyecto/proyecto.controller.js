'use strict';

var _ = require('lodash');

// Get list of proyectos
exports.index = function(req, res) {
	res.json([]);
};

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

	connection.query("use ss");
	console.log(input);

	var data = {
		pro_nombre: input.nombre,
		pro_sigla: input.sigla,
		pro_modulos: input.modulos
	};
	var query = connection.query('INSERT INTO proyecto SET ?', data, function(err, result) {

			if (err) {
				//throw err; debug
				return res.send(500);
				connection.end();
			} else {
				res.json([{
					msj: 'Registro del proyecto exitoso',
				}]);
				console.log('success');
				connection.end();
			}

			console.log(query.sql); // debug
		});

	};