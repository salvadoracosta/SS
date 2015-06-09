'use strict';

angular.module('app.controllers')
  .controller('VariableIndependienteCtrl', function ($scope, $http, $state, toaster, listavariablesauxiliares, variablesAuxiliaresFactory, $stateParams,$localStorage,idproyecto) {
    console.log(toaster);
    console.log(listavariablesauxiliares);
    console.log($stateParams.edit);
    $scope.idusuario = $localStorage.user.per_id;
    $scope.listavariablesauxiliares = listavariablesauxiliares.data;
    $scope.siglasProyecto = $localStorage.proyecto.pro_sigla;
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };

    if($scope.listavariablesauxiliares.length == 0){
      $scope.alerts = [
      { type: 'warning', msg: 'Usted aun no tiene variables independientes registradas para este proyecto' }
      ]; 
    }
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    if($stateParams.edit == 'nuevo'){
      $scope.registro = true;
    }
    if($stateParams.edit == 'actualizar'){
      $scope.registro = false;
    }
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
      $http.post('/api/variablesAuxiliares/'+idproyecto, { variable:$scope.variable}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Variable Independiente creada";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadVariablesIndependientes();
          $scope.registro = false;
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo registrar la nueva Variable Independiente, posiblemente es porblema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

    $scope.showregistro = function () {
      $scope.registro = true;
       $scope.editando = false;
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
      $http.delete('/api/variablesIndependientes/'+variable.varind_id).success(function(data, status) {
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
          $scope.reloadVariablesIndependientes();
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

    $scope.reloadVariablesIndependientes = function() {
      variablesIndependientesFactory.getListaVariablesIndependientes(idproyecto).then(function(response) {
        console.log(response);
        $scope.listavariablesindependientes = response.data;
      });
    }

    $scope.editar = function(variable) {
      $scope.variablefocus = variable;
      $scope.editando = true;
      console.log($scope.variablefocus);
      var valoresArray = JSON.parse(variable.varind_valores);
      variable.varind_valores='';
      for (var i = 0; i < valoresArray.length; i++) {
        if(i == valoresArray.length-1){
          variable.varind_valores +=valoresArray[i];
        }else{
          variable.varind_valores +=valoresArray[i]+',';
        }
        
      };
    }

    $scope.subsistemas = function(proyecto) {
      $localStorage.proyecto = proyecto;
      $state.go('app.subsistemaDesc',{idproyecto:proyecto.pro_id});
    }
    $scope.unidades = function(proyecto) {
     $state.go('app.unidadInformacion',{idproyecto:proyecto.pro_id});
    }

    $scope.variables = function(proyecto) {
     $state.go('app.variableIndependiente',{idproyecto:proyecto.pro_id});
    }

    $scope.editVariable = function() {
      $http.put('/api/variablesIndependientes/'+$scope.variablefocus.varind_id, { variable:$scope.variablefocus}).success(function(data, status) {
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
          $scope.reloadVariablesIndependientes();
          $scope.notshowEdit();
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo editar la variable, posiblemente es problema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
      
    };

  });
