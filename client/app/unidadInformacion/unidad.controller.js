'use strict';

angular.module('app.controllers')
  .controller('unidadInformacionCtrl', function ($scope, $http, $state, toaster, idproyecto,listaunidadesdeinformacion, unidadesFactory) {
    $scope.listaunidadesdeinformacion = listaunidadesdeinformacion.data;
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
    $scope.unidad = {};
    /*
    $scope.unidad.un_s1m1v1=5;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.unidad.un_s1m1v1 = val;
      });
    };
    
    angular.element("#slider").on('slideStop', function(data){
      console.log('ENTRA EN EL SLIDER!!!!')
      updateModel(data.value);
    });
    */
    /*
    $scope.pop = function(){
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        console.log('pop');
        $scope.registro = false;
    };
    */
    /*
    El scope es digamos el estado de la pagina, aqui puedes crear variables para usar en la pagina y luego usaras para algo mas
    En este caso en la consola de chrome vamos a ver un mensaje de Hello
    $scope.message = 'Hello';
    console.log($scope.message);
    */

    /*
    Funcion para registrar a un proyecto
    */
    $scope.addUnidadInformacion = function() {
      $http.post('/api/unidad/'+idproyecto, { unidad: $scope.unidad}).success(function(data, status) {

          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Proyecto creado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadUnidades();
          $scope.registro = false;
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo registrar el nuevo proyecto, posiblemente es porblema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

    $scope.showregistro = function () {
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

    $scope.borrar = function (unidad) {
      console.log(unidad);
      $http.delete('/api/unidad/'+unidad.un_id).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.toaster.title = "Proyecto Eliminado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadUnidades();
          //$state.go($state.current, {}, {reload: true});
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo borrar el proyecto, posiblemente es porblema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
    }

    $scope.reloadUnidades = function() {
      unidadesFactory.getListaUnidades(idproyecto).then(function(response) {
        console.log(response);
        $scope.listaunidadesdeinformacion = response.data;
      })
    }

    $scope.editar = function(unidad) {
      $scope.unidadfocus = unidad;
      $scope.editando = true;
      console.log($scope.unidadfocus);
    }

    $scope.editUnidad = function() {
      $http.put('/api/unidad/'+$scope.unidadfocus.un_id, { unidad: $scope.unidadfocus}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Unidad de Informacion editada";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.formEdit.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadUnidades();
          $scope.editando = false;
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo editar el proyecto, posiblemente es problema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

  });