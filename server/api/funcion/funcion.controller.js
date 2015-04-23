'use strict';

var _ = require('lodash');

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

	  var query = connection.query('SELECT * FROM funcion', function(err, result) {
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
    fun_id    : req.params.id
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
	  var queryString = 'DELETE FROM funcion WHERE fun_id =' + connection.escape(data.fun_id) ;
	  var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	        res.json([{
				          msj : 'La funcion fue eliminada sin problemas',
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
		fun_nombre: input.nombre,
		fun_comentario:input.comentario,
		fun_val1: input.v1,
		fun_val2: input.v2,
		fun_val3: input.v3,
		fun_val4: input.v4,
		fun_val5: input.v5,
		fun_val6: input.v6,
		fun_val7: input.v7,
		fun_val8: input.v8,
		fun_val9: input.v9
	};
	var query = connection.query('INSERT INTO funcion SET ?', data, function(err, result) {

			if (err) {
				throw err; debug
				return res.send(500);
				connection.end();
			} else {
				res.json([{
					msj: 'Registro de la funcion exitoso',
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
		fun_id: req.params.id,
		fun_tipo: input.tipo,
		fun_val1: input.v1,
		fun_val2: input.v2,
		fun_val3: input.v3,
		fun_val4: input.v4,
		fun_val5: input.v5,
		fun_val6: input.v6,
		fun_val7: input.v7,
		fun_val8: input.v8,
		fun_val9: input.v9,
		fun_com1: input.com1,
		fun_com2: input.com2,
		fun_com3: input.com3,
		fun_com4: input.com4,
		fun_com5: input.com5,
		fun_com6: input.com6,
		fun_com7: input.com7,
		fun_com8: input.com8,
		fun_com9: input.com9
	};

	var queryString = 'UPDATE funcion SET fun_tipo ='+connection.escape(data.fun_tipo)+', fun_val1 = '+connection.escape(data.fun_val1)+', fun_val2= '+connection.escape(data.fun_val2)+', fun_val3= '+connection.escape(data.fun_val3)+', fun_val4= '+connection.escape(data.fun_val4)+', fun_val5= '+connection.escape(data.fun_val5)+', fun_val6= '+connection.escape(data.fun_val6)+', fun_val7= '+connection.escape(data.fun_val7)+', fun_val8= '+connection.escape(data.fun_val8)+', fun_val9= '+connection.escape(data.fun_val9)+', fun_com1= '+connection.escape(data.fun_com1)+', fun_com2= '+connection.escape(data.fun_com2)+', fun_com3= '+connection.escape(data.fun_com3)+', fun_com4= '+connection.escape(data.fun_com4)+', fun_com5= '+connection.escape(data.fun_com5)+', fun_com6= '+connection.escape(data.fun_com6)+', fun_com7= '+connection.escape(data.fun_com7)+', fun_com8= '+connection.escape(data.fun_com8)+', fun_com9= '+connection.escape(data.fun_com9)+' WHERE fun_id=' + connection.escape(data.fun_id) ;
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

exports.funionesByIdProyecto = function(req, res) {
	var data = {
    	pro_id    : req.params.id
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

	  
	  var queryString = 'SELECT f.*,v.var_id FROM proyecto AS p LEFT JOIN subsistema AS s ON s.sub_idproyecto = p.pro_id LEFT JOIN modulo AS m ON m.mod_idsubsistema = s.sub_id LEFT JOIN variable AS v ON v.var_idmodulo = m.mod_id LEFT JOIN funcion AS f ON v.var_funcion = f.fun_id WHERE p.pro_id = ' + connection.escape(data.pro_id) ;
	console.log(queryString);
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
