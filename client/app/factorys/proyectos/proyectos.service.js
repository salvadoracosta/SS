'use strict';

angular.module('app.services',[])
  .factory('proyectosFactory', ['$http', function($http) {
    console.log('Factory');
    var listaproyectos;
    
   var sdo = {
    getListaProyectos: function () {
        var promise = $http.get('/api/proyectos').success(function(data, status) {
                $scope.status = status;
                listaproyectos = data;
                console.log($listaproyectos);
            }).
            error(function(data, status, headers, config) {
                $scope.authError = 'Error, algo anda mal con nosotros, intente despues';
                $scope.status = status;
                console.log($scope);
            });
        return promise;
      }
  }
  return sdo;
  }]);
