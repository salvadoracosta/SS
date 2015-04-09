'use strict';

var _ = require('lodash');

// Get list of pesos
exports.index = function(req, res) {
	var mysql = require('mysql');
    var data = {
      pro_id    : req.params.id
    };
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
    });
    connection.query("use mydb");
    
    var queryString = 'SELECT pro_nombre as pn ,sub_id as si, sub_nombre as sn,sub_peso as sp,mod_id as mi, mod_nombre as mn, mod_peso as mp,var_id as vi, var_nombre as vn , var_peso as vp FROM proyecto as p LEFT JOIN subsistema as s ON s.sub_idproyecto = p.pro_id LEFT JOIN modulo as m ON m.mod_idsubsistema = s.sub_id LEFT JOIN variable as v ON v.var_idmodulo = m.mod_id  WHERE  p.pro_id = ' +connection.escape(data.pro_id) ;
    var query = connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
        debug
        return res.send(409);
        connection.end();
      } else {
        res.json(result);
        //console.log( 'success', result );
        connection.end();
      }
    });
};

exports.update = function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("inputtt", input.id_proyecto);
  console.log("subsistema1 ", input.sub1_id);
  console.log("s1 peso ", input.sub1_peso);
  console.log("subsistema2 ", input.sub2_id);
  console.log("s2 peso ", input.sub2_peso);
  console.log("subsistema3 ", input.sub3_id);
  console.log("s3 peso ", input.sub3_peso);
  //console.log("reeees", res);
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
  });
  connection.query("use mydb");
  var data = {
    sub1_peso :  input.sub1_peso,
    sub1_id : input.sub1_id
  };



  var queryString = 'UPDATE subsistema SET sub_peso = ' + connection.escape(data.sub1_peso) + ' WHERE sub_id = ' + connection.escape(data.sub1_id);
  console.log("queryyy " + queryString);
  if( connection.escape(data.sub1_id)!=null){
    var query = connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
        debug
        return res.send(409);
        connection.end();
      } else {
        res.json([{
          msj: 'Peso registrado correctamente',
        }]);
        //console.log( 'success' );
        connection.end();
      }
    });
  }

};
