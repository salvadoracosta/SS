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

	  var query = connection.query('SELECT * FROM variable', function(err, result) {
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

exports.getVariablesById = function(req, res) {
	  var mysql = require('mysql');
	  var connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: 'admin'
	  });
	  var data = {
	    mod_id    : req.params.id
	  };
	  connection.connect(function(err) {
	    if (err) {
	      console.error('error connecting: ' + err.stack);
	      return;
	    }
	    //console.log('connected as id ' + connection.threadId);
	  });

	  connection.query("use mydb");

	  var query = connection.query('SELECT * FROM variable WHERE var_idmodulo ='+ connection.escape(data.mod_id) , function(err, result) {
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
    var_id    : req.params.id
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
	  var queryString = 'DELETE FROM variable WHERE var_id =' + connection.escape(data.var_id) ;
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
		var_nombre: input.nombre,
		var_sigla: input.sigla,
		var_descripcioncorta: input.descripcioncorta,
		var_descripcionlarga: input.descripcionlarga,
		var_sujeto: input.sujeto,
		var_verbo: input.verbo,
		var_predicado: input.predicado,
		var_funcion: input.funcion,
		var_val1: input.v1,
		var_val2: input.v2,
		var_val3: input.v3,
		var_val4: input.v4,
		var_val5: input.v5,
		var_val6: input.v6,
		var_val7: input.v7,
		var_val8: input.v8,
		var_val9: input.v9,
		var_com1: input.com1,
		var_com2: input.com2,
		var_com3: input.com3,
		var_com4: input.com4,
		var_com5: input.com5,
		var_com6: input.com6,
		var_com7: input.com7,
		var_com8: input.com8,
		var_com9: input.com9
	};
	var query = connection.query('INSERT INTO variable SET ?', data, function(err, result) {

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

	var data = {
		var_nombre: input.nombre,
		var_sigla: input.sigla,
		var_descripcioncorta: input.descripcioncorta,
		var_descripcionlarga: input.descripcionlarga,
		var_sujeto: input.sujeto,
		var_verbo: input.verbo,
		var_predicado: input.predicado,
		var_funcion: input.funcion,
		var_val1: input.v1,
		var_val2: input.v2,
		var_val3: input.v3,
		var_val4: input.v4,
		var_val5: input.v5,
		var_val6: input.v6,
		var_val7: input.v7,
		var_val8: input.v8,
		var_val9: input.v9,
		var_com1: input.com1,
		var_com2: input.com2,
		var_com3: input.com3,
		var_com4: input.com4,
		var_com5: input.com5,
		var_com6: input.com6,
		var_com7: input.com7,
		var_com8: input.com8,
		var_com9: input.com9,
		var_idmodulo: req.params.id,
	};
	var query = connection.query('INSERT INTO variable SET ?', data, function(err, result) {

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
		var_id: req.params.id,
		var_nombre: input.nombre,
		var_sigla: input.sigla,
		var_descripcioncorta: input.descripcioncorta,
		var_descripcionlarga: input.descripcionlarga,
		var_sujeto: input.sujeto,
		var_verbo: input.verbo,
		var_predicado: input.predicado,
		var_funcion: input.funcion,
		var_val1: input.v1,
		var_val2: input.v2,
		var_val3: input.v3,
		var_val4: input.v4,
		var_val5: input.v5,
		var_val6: input.v6,
		var_val7: input.v7,
		var_val8: input.v8,
		var_val9: input.v9,
		var_com1: input.com1,
		var_com2: input.com2,
		var_com3: input.com3,
		var_com4: input.com4,
		var_com5: input.com5,
		var_com6: input.com6,
		var_com7: input.com7,
		var_com8: input.com8,
		var_com9: input.com9
	};

	var queryString = 'UPDATE variable SET var_nombre = '+connection.escape(data.var_nombre)+', var_sigla= '+connection.escape(data.var_sigla)+', var_descripcioncorta= '+connection.escape(data.var_descripcioncorta)+', var_descripcionlarga= '+connection.escape(data.var_descripcionlarga)+', var_funcion ='+connection.escape(data.var_funcion)+', var_val1 = '+connection.escape(data.var_val1)+', var_val2= '+connection.escape(data.var_val2)+', var_val3= '+connection.escape(data.var_val3)+', var_val4= '+connection.escape(data.var_val4)+', var_val5= '+connection.escape(data.var_val5)+', var_val6= '+connection.escape(data.var_val6)+', var_val7= '+connection.escape(data.var_val7)+', var_val8= '+connection.escape(data.var_val8)+', var_val9= '+connection.escape(data.var_val9)+', var_com1= '+connection.escape(data.var_com1)+', var_com2= '+connection.escape(data.var_com2)+', var_com3= '+connection.escape(data.var_com3)+', var_com4= '+connection.escape(data.var_com4)+', var_com5= '+connection.escape(data.var_com5)+', var_com6= '+connection.escape(data.var_com6)+', var_com7= '+connection.escape(data.var_com7)+', var_com8= '+connection.escape(data.var_com8)+', var_com9= '+connection.escape(data.var_com9)+', var_sujeto= '+connection.escape(data.var_sujeto)+', var_verbo= '+connection.escape(data.var_verbo)+', var_predicado= '+connection.escape(data.var_predicado)+' WHERE var_id=' + connection.escape(data.var_id) ;
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