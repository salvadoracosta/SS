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
    sub1_id : input.sub1_id,
    sub2_peso : input.sub2_peso,
    sub2_id : input.sub2_id,
    sub3_peso : input.sub3_peso,
    sub3_id : input.sub3_id,
    mod11_id : input.mod11_id,
    mod11_peso: input.mod11_peso,
    mod12_id : input.mod12_id,
    mod12_peso : input.mod12_peso,
    mod13_id : input.mod13_id,
    mod13_peso : input.mod13_peso,
    var111_id :input.var111_id,
    var111_peso : input.var111_peso,
    var112_id : input.var112_id,
    var112_peso : input.var112_peso,
    var113_id : input.var113_id,
    var113_peso : input.var113_peso,
    var121_id: input.var121_id,
    var121_peso:input.var121_peso,
    var122_id : input.var122_id,
    var122_peso:input.var122_peso,
    var123_id:input.var123_id,
    var123_peso:input.var123_peso,
    var131_id:input.var131_id,
    var131_peso:input.var131_peso,
    var132_id:input.var132_id,
    var132_peso:input.var132_peso,
    var133_id:input.var133_id,
    var133_peso:input.var133_peso,
    mod21_id: input.mod21_id,
    mod21_peso:input.mod21_peso,
    mod22_id: input.mod22_id,
    mod22_peso:input.mod22_peso,
    mod23_id: input.mod23_id,
    mod23_peso:input.mod23_peso,
    var211_id: input.var211_id,
    var211_peso : input.var211_peso,
    var212_id : input.var212_id,
    var212_peso : input.var212_peso,
    var213_id : input.var213_id,
    var213_peso : input.var213_peso,
    var221_id: input.var221_id,
    var221_peso : input.var221_peso,
    var222_id : input.var222_id,
    var222_peso : input.var222_peso,
    var223_id : input.var223_id,
    var223_peso : input.var223_peso,
    var231_id: input.var231_id,
    var231_peso : input.var231_peso,
    var232_id : input.var232_id,
    var232_peso : input.var232_peso,
    var233_id : input.var233_id,
    var233_peso : input.var233_peso,
    mod31_id: input.mod31_id,
    mod31_peso:input.mod31_peso,
    mod32_id: input.mod32_id,
    mod32_peso:input.mod32_peso,
    mod33_id: input.mod33_id,
    mod33_peso:input.mod33_peso,
    var311_id: input.var311_id,
    var311_peso : input.var311_peso,
    var312_id : input.var312_id,
    var312_peso : input.var312_peso,
    var313_id : input.var313_id,
    var313_peso : input.var313_peso
  };

  var queryString = 'UPDATE subsistema SET sub_peso = ' + connection.escape(data.sub1_peso) + ' WHERE sub_id = ' + connection.escape(data.sub1_id);
  console.log("queryyy " + queryString);
  if( connection.escape(data.sub1_id)!='NULL'){
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
      }
    });
  }else{
    console.log("No se ejecuto el update");
  }

  var queryString = 'UPDATE subsistema SET sub_peso = ' + connection.escape(data.sub2_peso) + ' WHERE sub_id = ' + connection.escape(data.sub2_id);
  console.log(queryString);
  if(connection.escape(data.sub2_id) !='NULL'){
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
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }
  
  var queryString = 'UPDATE subsistema SET sub_peso = ' + connection.escape(data.sub3_peso) + ' WHERE sub_id = ' + connection.escape(data.sub3_id);
  console.log(queryString);
  if(connection.escape(data.sub3_id) !='NULL'){
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
    
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod11_peso) + ' WHERE mod_id = ' + connection.escape(data.mod11_id);
  console.log(queryString);
  if(connection.escape(data.mod11_id) !='NULL'){
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
       
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod12_peso) + ' WHERE mod_id = ' + connection.escape(data.mod12_id);
  console.log(queryString);
  if(connection.escape(data.mod12_id) !='NULL'){
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
    
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod13_peso) + ' WHERE mod_id = ' + connection.escape(data.mod13_id);
  console.log(queryString);
  if(connection.escape(data.mod13_id) !='NULL'){
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
      
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var111_peso) + ' WHERE var_id = ' + connection.escape(data.var111_id);
  console.log(queryString);
  if(connection.escape(data.var111_id) !='NULL'){
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
      
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var112_peso) + ' WHERE var_id = ' + connection.escape(data.var112_id);
  console.log(queryString);
  if(connection.escape(data.var112_id) !='NULL'){
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
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var113_peso) + ' WHERE var_id = ' + connection.escape(data.var113_id);
  console.log(queryString);
  if(connection.escape(data.var113_id) !='NULL'){
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
       
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var121_peso) + ' WHERE var_id = ' + connection.escape(data.var121_id);
  console.log(queryString);
  if(connection.escape(data.var121_id) !='NULL'){
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
      
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }


  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var122_peso) + ' WHERE var_id = ' + connection.escape(data.var122_id);
  console.log(queryString);
  if(connection.escape(data.var122_id) !='NULL'){
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
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var123_peso) + ' WHERE var_id = ' + connection.escape(data.var123_id);
  console.log(queryString);
  if(connection.escape(data.var123_id) !='NULL'){
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
   
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var131_peso) + ' WHERE var_id = ' + connection.escape(data.var131_id);
  console.log(queryString);
  if(connection.escape(data.var131_id) !='NULL'){
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
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var132_peso) + ' WHERE var_id = ' + connection.escape(data.var132_id);
  console.log(queryString);
  if(connection.escape(data.var132_id) !='NULL'){
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
     
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var133_peso) + ' WHERE var_id = ' + connection.escape(data.var133_id);
  console.log(queryString);
  if(connection.escape(data.var133_id) !='NULL'){
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

      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }


  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod21_peso) + ' WHERE mod_id = ' + connection.escape(data.mod21_id);
  console.log(queryString);
  if(connection.escape(data.mod21_id) !='NULL'){
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
   
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }



  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod22_peso) + ' WHERE mod_id = ' + connection.escape(data.mod22_id);
  console.log(queryString);
  if(connection.escape(data.mod22_id) !='NULL'){
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
  
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }


  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod23_peso) + ' WHERE mod_id = ' + connection.escape(data.mod23_id);
  console.log(queryString);
  if(connection.escape(data.mod23_id) !='NULL'){
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
       
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var211_peso) + ' WHERE var_id = ' + connection.escape(data.var211_id);
  console.log(queryString);
  if(connection.escape(data.var211_id) !='NULL'){
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

      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var212_peso) + ' WHERE var_id = ' + connection.escape(data.var212_id);
  console.log(queryString);
  if(connection.escape(data.var212_id) !='NULL'){
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
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }


  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var213_peso) + ' WHERE var_id = ' + connection.escape(data.var213_id);
  console.log(queryString);
  if(connection.escape(data.var213_id) !='NULL'){
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
       
      
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }


  console.log("variables modulo 2 subs2 ");

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var221_peso) + ' WHERE var_id = ' + connection.escape(data.var221_id);
  console.log(queryString);
  if(connection.escape(data.var221_id) !='NULL'){
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
       
       //connection.end();
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var222_peso) + ' WHERE var_id = ' + connection.escape(data.var222_id);
  console.log(queryString);
  if(connection.escape(data.var222_id) !='NULL'){
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
       
     
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var223_peso) + ' WHERE var_id = ' + connection.escape(data.var223_id);
  console.log(queryString);
  if(connection.escape(data.var223_id) !='NULL'){
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
       
       
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var231_peso) + ' WHERE var_id = ' + connection.escape(data.var231_id);
  console.log(queryString);
  if(connection.escape(data.var231_id) !='NULL'){
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
       
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var232_peso) + ' WHERE var_id = ' + connection.escape(data.var232_id);
  console.log(queryString);
  if(connection.escape(data.var232_id) !='NULL'){
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
       
      
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE variable SET var_peso = ' + connection.escape(data.var233_peso) + ' WHERE var_id = ' + connection.escape(data.var233_id);
  console.log(queryString);
  if(connection.escape(data.var233_id) !='NULL'){
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
       
       
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod31_peso) + ' WHERE mod_id = ' + connection.escape(data.mod31_id);
  console.log(queryString);
  if(connection.escape(data.mod31_id) !='NULL'){
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
  
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }


  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod32_peso) + ' WHERE mod_id = ' + connection.escape(data.mod32_id);
  console.log(queryString);
  if(connection.escape(data.mod32_id) !='NULL'){
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
  
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }



  var queryString = 'UPDATE modulo SET mod_peso = ' + connection.escape(data.mod33_peso) + ' WHERE mod_id = ' + connection.escape(data.mod33_id);
  console.log(queryString);
  if(connection.escape(data.mod33_id) !='NULL'){
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
  
        connection.end();
      }
    });
    console.log("agregamos");
  }else{
    console.log("es null");
  }

};
