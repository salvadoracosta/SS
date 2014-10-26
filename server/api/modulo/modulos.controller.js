'use strict';

var _ = require('lodash');

// Get list of modulos
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

	var query = connection.query('SELECT * FROM modulo', function(err, result) {
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
};

exports.delete = function(req, res) {
	var data = {
		mod_id: req.params.id
	};
	console.log(data);
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
	var queryString = 'DELETE FROM modulo WHERE mod_id =' + connection.escape(data.mod_id);
	var query = connection.query(queryString, function(err, result) {
		if (err) {
			throw err;
			debug
			return res.send(409);
			connection.end();
		} else {
			res.json([{
				msj: 'El modulo fue eliminado sin problemas',
			}]);
			//console.log( 'success' );
			connection.end();
		}
	});

	// res.json([]);
};

exports.registro = function(req, res) {

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

	var data = {
		//mod_nombre: input.nombre,
		//mod_sigla: input.sigla,
		mod_var1: input.var1,
		mod_var2: input.var2,
		mod_var3: input.var3,
		mod_peso: input_peso,
		mod_peso2: input_peso2,
		mod_peso3: input_peso3

	};
	var query = connection.query('INSERT INTO modulo SET ?', data, function(err, result) {
		if (err) {
			//throw err; debug
			return res.send(500);
			connection.end();
		} else {
			res.json([{
				msj: 'Registro del modulo exitoso',
			}]);
			console.log('success');
			connection.end();
		}
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

	var data = {
		mod_var1: input.var1,
		mod_var2: input.var2,
		mod_var3: input.var3,
		mod_peso: input_peso,
		mod_peso2: input_peso2,
		mod_peso3: input_peso3
	};
	var queryString = 'UPDATE modulo SET mod_var1 = ' + connection.escape(data.mod_var1) + ', mod_var2= ' + connection.escape(data.mod_var2) + ', mod_var3= ' + connection.escape(data.mod_var3)+', mod_peso= ' + connection.escape(data.mod_peso) +', mod_peso2= ' + connection.escape(data.mod_peso2) + ', mod_peso3= ' + connection.escape(data.mod_peso3)+ ' WHERE mod_id=' + connection.escape(data.mod_id);
	var query = connection.query(queryString, function(err, result) {
		if (err) {
			throw err;
			debug
			return res.send(409);
			connection.end();
		} else {
			console.log(queryString);
			res.json([{
				msj: 'El modulo fue editado exitosamente',
			}]);
			//console.log( 'success' );
			connection.end();
		}
	});

};