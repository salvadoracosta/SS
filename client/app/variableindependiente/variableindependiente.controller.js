'use strict';

angular.module('app.controllers')
  .controller('VariableIndependienteCtrl', function ($scope,$http,toaster, listavariables, variablesIndependientesFactory) {
    console.log(listavariables);
    console.log(toaster);
    $scope.listavariables = listavariables.data;
    $scope.items = [{htmlField:'<p>stuff</p>'},{htmlField:'<p>more stuff</p>'}];
    //console.log(proyectosFactory);
    //$scope.listaproyectos = listaproyectos.data;
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
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
    $scope.addVariable = function() {
      console.log($scope);
      $http.post('/api/variables', { nombre: $scope.nombre , sigla : $scope.sigla , descripcioncorta : $scope.descripcioncorta, descripcionlarga : $scope.descripcionlarga}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Variable creada";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadVariables();
          $scope.registro = false;
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo registrar la variable, posiblemente es porblema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

    $scope.showregistro = function () {
      $scope.editando = false;
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

    $scope.borrar = function (variable) {
      console.log(variable);
      $http.delete('/api/variables/'+variable.var_id).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.toaster.title = "Variable Eliminada";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadVariables();
          //$state.go($state.current, {}, {reload: true});
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo borrar la variable, posiblemente es porblema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
    }
    
    $scope.reloadVariables = function() {
      variablesFactory.getListaVariables().then(function(response) {
        console.log(response);
        $scope.listavariables = response.data;
      })
    }
  
    $scope.editar = function(variable) {
      $scope.variablefocus = variable;
      $scope.editando = true;
      console.log($scope.variablefocus);
    }

    $scope.editVariable = function() {
      $http.put('/api/variables/'+$scope.variablefocus.var_id, { nombre: $scope.variablefocus.var_nombre , sigla : $scope.variablefocus.var_sigla , descripcioncorta : $scope.variablefocus.var_descripcioncorta, descripcionlarga : $scope.variablefocus.var_descripcionlarga}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          //$scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Variable editada";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.formEdit.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadVariables();
          $scope.editando = false;
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo editar la variable, posiblemente es porblema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

  });
