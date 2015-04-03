'use strict';

angular.module('app.controllers')
  .controller('PerfilCtrl', function ($scope,$http,toaster,$localStorage) {
    console.log($localStorage.user);
    console.log(toaster);
    $scope.user = $localStorage.user;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
	toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    $scope.editPerfil = function() {

      $http.put('/api/usuarios/'+$scope.user.per_id, { user: $scope.user}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          $scope.toaster.title = "Perfil editado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo editar el perfil, posiblemente es problema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };
	

  });
