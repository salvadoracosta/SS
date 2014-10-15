'use strict';

/* Services */


// Demonstrate how to register services
angular.module('app.services', [])
.factory('proyectosFactory', ['$http', function($http) {
    console.log('Factory');
    var listaproyectos;
    
   var sdo = {
    getListaProyectos: function () {
        var promise = $http.get('/api/proyectos').success(function(data, status) {
                
                listaproyectos = data;
                //console.log(listaproyectos);
            }).
            error(function(data, status, headers, config) {
                
                //console.log(status);
            });
        return promise;
      }
  }
  return sdo;
  }])