'use strict';

var _ = require('lodash');

exports.getByProyecto = function(req, res) {
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
  	var queryString = 'SELECT * FROM unidad_informacion AS u INNER JOIN unidad_variable AS uv ON u.un_id = uv.unidad_id  WHERE u.un_idproyecto =' + connection.escape(data.pro_id) ;
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
  }

  exports.getUniddadesIndependientes = function(req, res) {
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
  	var queryString = 'SELECT * FROM unidad_informacion AS u INNER JOIN unidad_variableindependiente AS uvi ON u.un_id = uvi.unidad_id  WHERE u.un_idproyecto =' + connection.escape(data.pro_id) ;
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
  }

	exports.registroById = function(req, res) {

	var input = JSON.parse(JSON.stringify(req.body));

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'admin',
		multipleStatements: true
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
		un_s1m1v1: input.unidad.un_s1m1v1,
		un_s1m1v2: input.unidad.un_s1m1v2,
		un_s1m1v3: input.unidad.un_s1m1v3,
		un_s1m2v1: input.unidad.un_s1m2v1,
		un_s1m2v2: input.unidad.un_s1m2v2,
		un_s1m2v3: input.unidad.un_s1m2v3,
		un_s1m3v1: input.unidad.un_s1m3v1,
		un_s1m3v2: input.unidad.un_s1m3v2,
		un_s1m3v3: input.unidad.un_s1m3v3,
		un_s2m1v1: input.unidad.un_s2m1v1,
		un_s2m1v2: input.unidad.un_s2m1v2,
		un_s2m1v3: input.unidad.un_s2m1v3,
		un_s2m2v1: input.unidad.un_s2m2v1,
		un_s2m2v2: input.unidad.un_s2m2v2,
		un_s2m2v3: input.unidad.un_s2m2v3,
		un_s2m3v1: input.unidad.un_s2m3v1,
		un_s2m3v2: input.unidad.un_s2m3v2,
		un_s2m3v3: input.unidad.un_s2m3v3,
		un_s3m1v1: input.unidad.un_s3m1v1,
		un_s3m1v2: input.unidad.un_s3m1v2,
		un_s3m1v3: input.unidad.un_s3m1v3,
		un_s3m2v1: input.unidad.un_s3m2v1,
		un_s3m2v2: input.unidad.un_s3m2v2,
		un_s3m2v3: input.unidad.un_s3m2v3,
		un_s3m3v1: input.unidad.un_s3m3v1,
		un_s3m3v2: input.unidad.un_s3m3v2,
		un_s3m3v3: input.unidad.un_s3m3v3,
		un_idproyecto: req.params.id
	};
	
	var query = connection.query('INSERT INTO unidad_informacion SET ?', data, function(err, result) {

			if (err) {
				throw err; debug
				return res.send(500);
				connection.end();
			} else {
				var multiplequery="";
				for (var i = 0; i < input.unidad.variablesindependientes.length; i++) {
					if(typeof input.unidad.variablesindependientes[i].valueSelected  !== "undefined"){
						multiplequery+='INSERT INTO unidad_variableindependiente SET unidad_id='+connection.escape(result.insertId)+', variable_id ='+connection.escape(input.unidad.variablesindependientes[i].varind_id)+', value='+connection.escape(input.unidad.variablesindependientes[i].valueSelected.trim())+';';
					}
					
				};
				if(multiplequery != ""){
					console.log(multiplequery);
					connection.query(multiplequery, function(err, results) {
						  if (err){
						  	throw err;
						  	connection.end();
						  }else{
						  	res.json([{
								msj: 'Registro de la unidad de inofrmacion exitoso',
							}]);
						  } 
					});
				}else{
					res.json([{
								msj: 'Registro de la unidad de inofrmacion exitoso',
							}]);
				}
				var multiplequery2="";
				for (var i = 0; i < input.unidad.variables.length; i++) {
					if(typeof input.unidad.variables[i].valueSelected  !== "undefined"){
						multiplequery2+='INSERT INTO unidad_variable SET unidad_id='+connection.escape(result.insertId)+', variable_id ='+connection.escape(input.unidad.variables[i].var_id)+', valor='+connection.escape(input.unidad.variables[i].valueSelected.trim())+';';
					}
					
				};
				if(multiplequery2 != ""){
					console.log(multiplequery2);
					connection.query(multiplequery2, function(err, results) {
						  if (err){
						  	throw err;
						  	connection.end();
						  }else{
						  	res.json([{
								msj: 'Registro de la unidad de inofrmacion exitoso',
							}]);
						  } 
					});
				}else{
					res.json([{
								msj: 'Registro de la unidad de inofrmacion exitoso',
							}]);
				}
				
				console.log('success');
				connection.end();
			}

			console.log(query.sql); // debug
		});

	};

	exports.delete = function(req, res) {

	//var input = JSON.parse(JSON.stringify(req.body));
	var data = {
    un_id    : req.params.id
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
	  var queryString = 'DELETE FROM unidad_informacion WHERE un_id =' + connection.escape(data.un_id) ;
	  var query = connection.query(queryString, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	        res.json([{
				          msj : 'La unidad de informacion fue eliminada sin problemas',
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
		password: 'admin',
		multipleStatements: true
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
		un_s1m1v1: input.unidad.un_s1m1v1,
		un_s1m1v2: input.unidad.un_s1m1v2,
		un_s1m1v3: input.unidad.un_s1m1v3,
		un_s1m2v1: input.unidad.un_s1m2v1,
		un_s1m2v2: input.unidad.un_s1m2v2,
		un_s1m2v3: input.unidad.un_s1m2v3,
		un_s1m3v1: input.unidad.un_s1m3v1,
		un_s1m3v2: input.unidad.un_s1m3v2,
		un_s1m3v3: input.unidad.un_s1m3v3,
		un_s2m1v1: input.unidad.un_s2m1v1,
		un_s2m1v2: input.unidad.un_s2m1v2,
		un_s2m1v3: input.unidad.un_s2m1v3,
		un_s2m2v1: input.unidad.un_s2m2v1,
		un_s2m2v2: input.unidad.un_s2m2v2,
		un_s2m2v3: input.unidad.un_s2m2v3,
		un_s2m3v1: input.unidad.un_s2m3v1,
		un_s2m3v2: input.unidad.un_s2m3v2,
		un_s2m3v3: input.unidad.un_s2m3v3,
		un_s3m1v1: input.unidad.un_s3m1v1,
		un_s3m1v2: input.unidad.un_s3m1v2,
		un_s3m1v3: input.unidad.un_s3m1v3,
		un_s3m2v1: input.unidad.un_s3m2v1,
		un_s3m2v2: input.unidad.un_s3m2v2,
		un_s3m2v3: input.unidad.un_s3m2v3,
		un_s3m3v1: input.unidad.un_s3m3v1,
		un_s3m3v2: input.unidad.un_s3m3v2,
		un_s3m3v3: input.unidad.un_s3m3v3,
		un_id: req.params.id
	};
	var multiplequery="";
	multiplequery='DELETE FROM unidad_variable WHERE unidad_id =' + connection.escape(data.un_id)+';';
	for (var i = 0; i < input.unidad.variables.length; i++) {
		if(typeof input.unidad.variables[i].value  !== "undefined"){
			multiplequery+='INSERT INTO unidad_variable SET valor='+connection.escape(input.unidad.variables[i].value)+', unidad_id = '+connection.escape(data.un_id)+', variable_id='+connection.escape(input.unidad.variables[i].idvariable)+';';
		}
	};
	multiplequery+='DELETE FROM unidad_variableindependiente WHERE unidad_id =' + connection.escape(data.un_id)+';';
	for (var i = 0; i < input.unidad.variablesindependientes.length; i++) {
		if(typeof input.unidad.variablesindependientes[i].valueSelected  !== "undefined"){
			multiplequery+='INSERT INTO unidad_variableindependiente SET value='+connection.escape(input.unidad.variablesindependientes[i].valueSelected)+',unidad_id = '+connection.escape(data.un_id)+', variable_id='+connection.escape(input.unidad.variablesindependientes[i].varind_id)+';';
		}else{
			if(typeof input.unidad.variablesindependientes[i].value  !== "undefined"){
			multiplequery+='INSERT INTO unidad_variableindependiente SET value='+connection.escape(input.unidad.variablesindependientes[i].value)+',unidad_id = '+connection.escape(data.un_id)+', variable_id='+connection.escape(input.unidad.variablesindependientes[i].varind_id)+';';	
			}
		}
	};
	console.log(multiplequery);
	//var queryString = 'UPDATE unidad_informacion SET un_s1m1v1 ='+connection.escape(data.un_s1m1v1)+ ',un_s1m1v2 ='+connection.escape(data.un_s1m1v2)+ ',un_s1m1v3 ='+connection.escape(data.un_s1m1v3)+ ',un_s1m2v1 ='+connection.escape(data.un_s1m2v1)+ ',un_s1m2v2 ='+connection.escape(data.un_s1m2v2)+ ',un_s1m2v3 ='+connection.escape(data.un_s1m2v3)+ ',un_s1m3v1 ='+connection.escape(data.un_s1m3v1)+ ',un_s1m3v2 ='+connection.escape(data.un_s1m3v2)+ ',un_s1m3v3 ='+connection.escape(data.un_s1m3v3)+ ',un_s2m1v1 ='+connection.escape(data.un_s2m1v1)+ ',un_s2m1v2 ='+connection.escape(data.un_s2m1v2)+ ',un_s2m1v3 ='+connection.escape(data.un_s2m1v3)+ ',un_s2m2v1 ='+connection.escape(data.un_s2m2v1)+ ',un_s2m2v2 ='+connection.escape(data.un_s2m2v2)+ ',un_s2m2v3 ='+connection.escape(data.un_s2m2v3)+ ',un_s2m3v1 ='+connection.escape(data.un_s2m3v1)+ ',un_s2m3v2 ='+connection.escape(data.un_s2m3v2)+ ',un_s2m3v3 ='+connection.escape(data.un_s2m3v3)+ ',un_s3m1v1 ='+connection.escape(data.un_s3m1v1)+ ',un_s3m1v2 ='+connection.escape(data.un_s3m1v2)+ ',un_s3m1v3 ='+connection.escape(data.un_s3m1v3)+ ',un_s3m2v1 ='+connection.escape(data.un_s3m2v1)+ ',un_s3m2v2 ='+connection.escape(data.un_s3m2v2)+ ',un_s3m2v3 ='+connection.escape(data.un_s3m2v3)+ ',un_s3m3v1 ='+connection.escape(data.un_s3m3v1)+ ',un_s3m3v2 ='+connection.escape(data.un_s3m3v2)+ ', un_s3m3v3 = '+connection.escape(data.un_s3m3v3)+ ', un_vi1 = '+connection.escape(data.un_vi1)+ ', un_vi2 = '+connection.escape(data.un_vi2)+ ', un_vi3 = '+connection.escape(data.un_vi3)+', un_vi4 = '+connection.escape(data.un_vi4)+', un_vi5 = '+connection.escape(data.un_vi5)+', un_vi6 = '+connection.escape(data.un_vi6)+', un_vi7 = '+connection.escape(data.un_vi7)+', un_vi8 = '+connection.escape(data.un_vi8)+', un_vi9 = '+connection.escape(data.un_vi9)+' WHERE un_id ='+connection.escape(data.un_id);
	var query = connection.query(multiplequery, function(err, result) {
	      if (err) {
	        throw err;
	        debug
	        return res.send(409);
	        connection.end();
	      } else {
	      	console.log(multiplequery);
	        res.json([{
				          msj : 'La unidad de informacion fue editadoa exitosamente',
				        }]);
	        //console.log( 'success' );
	        connection.end();
	      }
	    });

	};

	exports.getUniddadesByVariablesIndependientes = function(req, res) {
		var input = JSON.parse(JSON.stringify(req.body));
	/*	
  	var data = {
    	pro_id    : req.params.id
  	};
  	*/
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
	 	var queryString = 'SELECT u.unidad_id,u.variable_id,u.valor,uv.value FROM unidad_variable AS u INNER JOIN unidad_variableindependiente AS uv ON u.unidad_id = uv.unidad_id ' ; //+ connection.escape(data.pro_id) 
	 	if(input.variables.length>0){
	 		queryString += 'WHERE';
	 	}
		for (var i = 0; i < input.variables.length; i++) {
			if(i == input.variables.length-1){
				queryString += ' uv.value =' +connection.escape(input.variables[i]) ;
			}else{
				queryString += ' uv.value =' +connection.escape(input.variables[i])+' AND ';
			}
		};
		console.log(queryString);
	connection.query("use mydb");
  	//var queryString = 'SELECT * FROM unidad_informacion AS u INNER JOIN unidad_variable AS uv ON u.un_id = uv.unidad_id  WHERE u.un_idproyecto =' + connection.escape(data.pro_id) ;
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
  }