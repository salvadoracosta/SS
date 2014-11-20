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

    var query = connection.query('SELECT p.pro_nombre AS lev1, s.sub_nombre as lev2, m.mod_nombre as lev3 FROM proyecto AS p LEFT JOIN subsistema AS s ON s.sub_idproyecto = p.pro_id LEFT JOIN modulo AS m ON m.mod_idsubsistema = s.sub_id', function(err, result) {
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
