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
    
    var queryString = 'SELECT pro_nombre as pn , sub_nombre as sn,sub_peso as sp, mod_nombre as mn, mod_peso as mp, var_nombre as vn , var_peso as vp FROM proyecto as p LEFT JOIN subsistema as s ON s.sub_idproyecto = p.pro_id LEFT JOIN modulo as m ON m.mod_idsubsistema = s.sub_id LEFT JOIN variable as v ON v.var_idmodulo = m.mod_id  WHERE  p.pro_id = ' +connection.escape(data.pro_id) ;
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
};

exports.update = function(req, res) {
  
};
