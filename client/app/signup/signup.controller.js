'use strict';

angular.module('app.controllers')
  .controller('SignupCtrl', function($scope, $http) {
    /*
    El scope es digamos el estado de la pagina, aqui puedes crear variables para usar en la pagina y luego usaras para algo mas
    En este caso en la consola de chrome vamos a ver un mensaje de Hello
    $scope.message = 'Hello';
    console.log($scope.message);
    */

    /*
    Funcion para registrar a un usuario
    */
    $scope.addUsuario = function() {
      $http.post('/registro', {
        nombre: $scope.name,
        correo: $scope.email,
        password: $scope.password,
        telefono: $scope.tel,
        institucion: $scope.institucion
      }).success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log($scope);

        $scope.authError = '';
        $scope.authSuccess = data[0].msj;
        $scope.name = '';
        $scope.email = '';
        $scope.password = '';
        $scope.tel = '';
        $scope.institucion = '';
        $scope.agree = false;
        $scope.form.$setPristine();

      }).
      error(function(data, status, headers, config) {
        $scope.status = status;
        if ($scope.status == 409) {
          $scope.authError = 'La cuenta de correo ya esta registrada';
        } else {
          $scope.authError = 'Error al hacer el registro';
        }
        $scope.authSuccess = '';
        console.log($scope);
      });

    };
  });
