'use strict';

angular.module('app.controllers')
  .controller('SubsistemaCtrl', function ($scope,$http,toaster,listasubsistemas, subsistemasFactory) {
    $scope.listasubsistemas = listasubsistemas.data;
    console.log(listasubsistemas);
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
      $http.post('/api/subsistemas', { nombre: $scope.nombre , sigla : $scope.sigla , valor : $scope.valor, descripcioncorta : $scope.descripcioncorta, descripcionlarga : $scope.descripcionlarga}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
        $scope.toaster.title = "Susbsistema agregado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
         
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);  
          console.log('pop');
          $scope.reloadSubsistemas();
          $scope.registro = false;
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

    $scope.borrar = function (subsistema) {
      console.log(subsistema);
      $http.delete('/api/subsistemas/'+subsistema.sub_id).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.toaster.title = "Subsistema Eliminada";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadSubsistemas();
          //$state.go($state.current, {}, {reload: true});
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo borrar el subsistema, posiblemente es problema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
    }
    
    $scope.reloadSubsistemas = function() {
      subsistemasFactory.getListaSubsistemas().then(function(response) {
        console.log(response);
        $scope.listasubsistemas = response.data;
      })
    }
  
    $scope.editar = function(subsistema) {
      $scope.subsistemafocus = subsistema;
      $scope.editando = true;
      console.log($scope.subsistemafocus);
    }

    $scope.editSubsistema = function() {
      $http.put('/api/subsistemas/'+$scope.subsistemafocus.sub_id, { nombre: $scope.subsistemafocus.sub_nombre , sigla : $scope.subsistemafocus.sub_sigla ,valor: $scope.subsistemafocus.sub_valor,descripcioncorta: $scope.subsistemafocus.sub_descripcioncorta,descripcionlarga: $scope.subsistemafocus.sub_descripcionlarga}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Subsistema editado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.formEdit.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadSubsistemas();
          $scope.editando = false;
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo editar el subsistema, posiblemente es problema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

  });