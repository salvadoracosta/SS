'use strict';

angular.module('app.controllers')
  .controller('unidadInformacionCtrl', function ($scope, $http, $state, toaster, idproyecto,listaunidadesdeinformacion, unidadesFactory,listavariablesindependientes) {
    $scope.listaunidadesdeinformacion = listaunidadesdeinformacion.data;
    console.log(listavariablesindependientes.data);
    $scope.listavariablesindependientes = listavariablesindependientes.data;
    $scope.variablesjson = JSON.parse($scope.listavariablesindependientes[0].varind_valores);
    
    for (var i = 0; i < $scope.listavariablesindependientes.length; i++) {
      $scope.listavariablesindependientes[i].varind_valores = JSON.parse($scope.listavariablesindependientes[i].varind_valores);
    };

    console.log($scope.variablesjson);
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
    $scope.unidad = {
      variablesindependientes:[]
    };

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
      var variablesArray = [];
      for (var i = 0; i < $scope.listavariablesindependientes.length; i++) {
        variablesArray[i] = $scope.listavariablesindependientes[i].valueSelected;
        console.log($scope.listavariablesindependientes[i].valueSelected);
      };
      $scope.unidad.variablesindependientes = variablesArray;
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
      });
    }

    $scope.editar = function(unidad) {
      $scope.unidadfocus = unidad;
      $scope.editando = true;
      console.log($scope.unidadfocus);
      console.log($scope.editando);
      $scope.listavariablesindependientesFocus = $scope.listavariablesindependientes;
    }

    $scope.editUnidad = function() {
      var variablesArray = [];
      for (var i = 0; i < $scope.listavariablesindependientesFocus.length; i++) {
        variablesArray[i] = $scope.listavariablesindependientesFocus[i].valueSelected;
        console.log($scope.listavariablesindependientesFocus[i].valueSelected);
      };
      console.log($scope.unidadfocus);
      $scope.unidadfocus.variablesindependientes = variablesArray;
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