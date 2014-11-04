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
.factory('variablesFactory', ['$http', function($http) {
    console.log('Factory');
    var listavariables;
    
   var sdo = {
    getListaVariables: function () {
        var promise = $http.get('/api/variables').success(function(data, status) {
                
                listavariables = data;
                //console.log(listavariables);
            }).
            error(function(data, status, headers, config) {
                
                //console.log(status);
            });
        return promise;
      }
  }
  return sdo;
  }])
.factory('funcionesFactory', ['$http', function($http) {
    console.log('Factory');
    var listafunciones;
    
   var sdo = {
    getListaFunciones: function () {
        var promise = $http.get('/api/funciones').success(function(data, status) {
                
                listafunciones = data;
                //console.log(listavariables);
            }).
            error(function(data, status, headers, config) {
                
                //console.log(status);
            });
        return promise;
      }
  }
  return sdo;
  }])
.factory('subsistemasFactory', ['$http', function($http) {
    console.log('Factory SUbsistemas');
    var listasubsistemas;
    
   var sdo = {
    getListaSubsistemas: function () {
        var promise = $http.get('/api/subsistemas').success(function(data, status) {
                
                listasubsistemas = data;
                //console.log(listavariables);
            }).
            error(function(data, status, headers, config) {
                
                //console.log(status);
            });
        return promise;
      }
  }
  return sdo;
  }])
.factory('modulosFactory', ['$http', function($http) {
    console.log('Factory Modulos');
    var listamodulos;
    
   var sdo = {
    getListaModulos: function () {
        var promise = $http.get('/api/modulos').success(function(data, status) {
                
                listamodulos = data;
                //console.log(listavariables);
            }).
            error(function(data, status, headers, config) {
                
                //console.log(status);
            });
        return promise;
      }
  }
  return sdo;
  }])