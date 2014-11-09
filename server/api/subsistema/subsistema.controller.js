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
		sub_nombre: input.nombre,
		sub_sigla: input.sigla,
		sub_valor: input.valor,
		sub_descripcioncorta: input.descripcioncorta,
		sub_descripcionlarga: input.descripcionlarga
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

	exports.delete = function(req, res) {

	//var input = JSON.parse(JSON.stringify(req.body));
	var data = {
    sub_id    : req.params.id
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
	  var queryString = 'DELETE FROM subsistema WHERE sub_id =' + connection.escape(data.sub_id) ;
	  var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	        res.json([{
				          msj : 'El subsistema fue eliminado sin problemas',
				        }]);
	        //console.log( 'success' );
	        connection.end();
	      }
	    });

	    // res.json([]);
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
		sub_id: req.params.id,
		sub_nombre: input.nombre,
		sub_sigla: input.sigla,
		sub_valor: input.valor,
		sub_descripcioncorta: input.descripcioncorta,
		sub_descripcionlarga: input.descripcionlarga
	};
	var queryString = 'UPDATE subsistema SET sub_nombre = '+connection.escape(data.sub_nombre)+', sub_sigla= '+connection.escape(data.sub_sigla)+', sub_valor= '+connection.escape(data.sub_valor)+', sub_descripcioncorta= '+connection.escape(data.sub_descripcioncorta)+', sub_descripcionlarga= '+connection.escape(data.sub_descripcionlarga)+' WHERE sub_id=' + connection.escape(data.sub_id) ;
	var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	      	console.log(queryString);
	        res.json([{
				          msj : 'El subsistema fue editado exitosamente',
				        }]);
	        //console.log( 'success' );
	        connection.end();
	      }
	    });

	};