'use strict';

angular.module('app.controllers')
  .controller('SubsistemaCtrl', function ($scope,$http,toaster) {
    console.log(toaster);
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };

 $scope.showregistro = function () {
  console.log('REGISTROOOOOOO!');
      $scope.registro = true;
    }

    $scope.notshowregistro = function () {
      $scope.form.$setPristine();
      $scope.registro = false;
    }
    $scope.notshowEdit = function () {
      $scope.formEdit.$setPristine();
      $scope.editando = false;
    }

 $scope.addSubsistema = function() {
      $http.post('/api/subsistemas', { nombre: $scope.nombre , sigla : $scope.sigla , valor : $scope.valor}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
        $scope.toaster.title = "Susbsistema agregado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
         
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);  
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo registrar el nuevo subsistema, posiblemente es problema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

  });