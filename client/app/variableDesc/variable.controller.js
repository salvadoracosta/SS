'use strict';

angular.module('app.controllers')
  .controller('VariableDescCtrl', function ($scope,$http,toaster, listavariables, variablesFactory,idsubsistema,idmodulo,idproyecto) {
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
    Funcion para registrar a un proyecto
    */
    $scope.addVariable = function() {
      console.log($scope);
      console.log($scope.tipoFuncion);
      $http.post('/api/variables/'+idmodulo, { nombre: $scope.nombre , sigla : $scope.sigla , descripcioncorta : $scope.descripcioncorta, descripcionlarga : $scope.descripcionlarga, funcion: $scope.funcion, sujeto: $scope.sujeto, vervo: $scope.vervo, predicado: $scope.predicado, v1: $scope.v1 , v2: $scope.v2 , v3: $scope.v3, v4: $scope.v4,v5: $scope.v5,v6: $scope.v6,v7: $scope.v7,v8: $scope.v8,v9: $scope.v9, com1: $scope.com1 , com2: $scope.com2 , com3: $scope.com3, com4: $scope.com4,com5: $scope.com5,com6: $scope.com6,com7: $scope.com7,com8: $scope.com8,com9: $scope.com9}).success(function(data, status) {
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
      console.log($scope.form);
      $scope.form.$setPristine();
      console.log($scope.form);
      console.log($scope.form.$setPristine());
      $scope.registro = false;
    }
    $scope.notshowEdit = function () {
      $scope.formEdit.$setPristine();
      console.log($scope.formEdit.$setPristine());
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
      variablesFactory.getListaVariablesById(idmodulo).then(function(response) {
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
      $http.put('/api/variables/'+$scope.variablefocus.var_id, { nombre: $scope.variablefocus.var_nombre , sigla : $scope.variablefocus.var_sigla , descripcioncorta : $scope.variablefocus.var_descripcioncorta, descripcionlarga : $scope.variablefocus.var_descripcionlarga, sujeto: $scope.variablefocus.var_sujeto, vervo: $scope.variablefocus.var_vervo, predicado: $scope.variablefocus.var_predicado,funcion: $scope.variablefocus.var_funcion, v1: $scope.variablefocus.var_val1 , v2: $scope.variablefocus.var_val2 , v3: $scope.variablefocus.var_val3, v4: $scope.variablefocus.var_val4,v5: $scope.variablefocus.var_val5,v6: $scope.variablefocus.var_val6,v7: $scope.variablefocus.var_val7,v8: $scope.variablefocus.var_val8,v9: $scope.variablefocus.var_val9, com1: $scope.variablefocus.var_com1 , com2: $scope.variablefocus.var_com2 , com3: $scope.variablefocus.var_com3, com4: $scope.variablefocus.var_com4,com5: $scope.variablefocus.var_com5,com6: $scope.variablefocus.var_com6,com7: $scope.variablefocus.var_com7,com8: $scope.variablefocus.var_com8,com9: $scope.variablefocus.var_com9}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
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
