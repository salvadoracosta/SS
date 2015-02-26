'use strict';

var _ = require('lodash');

// Get list of pesos
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

     var query = connection.query('SELECT s.sub_nombre as sn,s.sub_peso as sp, m.mod_nombre as mn,m.mod_peso as mp, v.var_nombre as vn , v.var_peso as vp FROM proyecto AS p LEFT JOIN subsistema AS s ON s.sub_idproyecto = p.pro_id LEFT JOIN modulo AS m ON m.mod_idsubsistema = s.sub_id LEFT JOIN variable AS v ON v.var_idmodulo = m.mod_id ', function(err, result) {
   


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


};

exports.registro = function(req, res) {



	};

exports.update = function(req, res) {


	};