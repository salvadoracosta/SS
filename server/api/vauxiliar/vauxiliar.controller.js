'use strict';

var _ = require('lodash');
var moment = require('moment');
// Get list of proyectos

exports.registroById = function(req, res) {

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
	var myDate =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	var tmp = input.variable.values;
	var myJsonString = JSON.stringify(arrayValues);
	var data = {
		variableaux_nombre: input.variable.nombre,
		variableaux_fecha: myDate,
		variableaux_idproyecto    : req.params.id
	};
	var query = connection.query('INSERT INTO variable_auxiliar SET ?', data, function(err, result) {

			if (err) {
				throw err; debug
				return res.send(500);
				connection.end();
			} else {
				res.json([{
					msj: 'Registro de la variable exitoso',
				}]);
				console.log('success');
				connection.end();
			}

			console.log(query.sql); // debug
		});

	};

	exports.variablesById = function(req, res) {
		var data = {
	    	varind_idproyecto    : req.params.id
	  	};

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

	  	var queryString = 'SELECT * FROM variable_auxiliar WHERE variableaux_idproyecto =' + connection.escape(data.varind_idproyecto) ;
		var query = connection.query(queryString, function(err, result) {
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

	    // res.json([]);
};
exports.delete = function(req, res) {

	//var input = JSON.parse(JSON.stringify(req.body));
	var data = {
    varind_id    : req.params.id
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
	  var queryString = 'DELETE FROM variableaux_idproyecto WHERE variableaux_id =' + connection.escape(data.varind_id) ;
	  var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	        res.json([{
				          msj : 'La variable fue eliminada sin problemas',
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
		varind_id: req.params.id,
		varind_nombre: input.variable.varind_nombre
	};
	var queryString = 'UPDATE variable_independiente SET varind_nombre = '+connection.escape(data.varind_nombre)+', varind_valores= '+connection.escape(data.varind_valores)+',varind_descripcion ='+ connection.escape(data.varind_descripcion)+' WHERE varind_id=' + connection.escape(data.varind_id) ;
	var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	      	console.log(queryString);
	        res.json([{
				          msj : 'La variable fue editada exitosamente',
				        }]);
	        //console.log( 'success' );
	        connection.end();
	      }
	    });

	};