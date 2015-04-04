'use strict';

var _ = require('lodash');
var moment = require('moment');
// Get list of proyectos
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

	  var query = connection.query('SELECT * FROM proyecto', function(err, result) {
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

exports.proyectosById = function(req, res) {
		var data = {
	    	pro_autor    : req.params.id
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

	  	var queryString = 'SELECT * FROM proyecto WHERE pro_autor =' + connection.escape(data.pro_autor) ;
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
    pro_id    : req.params.id
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
	  var queryString = 'DELETE FROM proyecto WHERE pro_id =' + connection.escape(data.pro_id) ;
	  var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	        res.json([{
				          msj : 'El proyecto fue eliminado sin problemas',
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
	var myDate =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	var data = {
		pro_nombre: input.nombre,
		pro_modulos: input.modulos,
		pro_autor: input.autor,
		pro_fecha: myDate
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
		pro_id: req.params.id,
		pro_nombre: input.nombre,
		pro_modulos: input.modulos
	};
	var queryString = 'UPDATE proyecto SET pro_nombre = '+connection.escape(data.pro_nombre)+', pro_modulos= '+connection.escape(data.pro_modulos)+' WHERE pro_id=' + connection.escape(data.pro_id) ;
	var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	      	console.log(queryString);
	        res.json([{
				          msj : 'El proyecto fue editado exitosamente',
				        }]);
	        //console.log( 'success' );
	        connection.end();
	      }
	    });

	};