'use strict';

angular.module('app.controllers')
  .controller('ProyectoCtrl', function ($scope,$http) {
    /*
    El scope es digamos el estado de la pagina, aqui puedes crear variables para usar en la pagina y luego usaras para algo mas
    En este caso en la consola de chrome vamos a ver un mensaje de Hello
    $scope.message = 'Hello';
    console.log($scope.message);
    */

    /*
    Funcion para registrar a un usuario
    */
    $scope.addProyecto = function() {
      $http.post('/api/proyectos', { nombre: $scope.nombre , sigla : $scope.sigla , modulos : $scope.modulos}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          if($scope.status == 409){
             $scope.authError = 'Error error error';
          }else{
             $scope.authError = 'Error al hacer el registro';   
          }
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };
  });
