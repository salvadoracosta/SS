'use strict';

angular.module('app.controllers')
.controller('ModuloDescCtrl', function ($scope,$http,toaster, listamodulos, modulosFactory,idproyecto, idsubsistema,$state,$localStorage) {
  console.log(toaster);
  console.log(listamodulos);
  $scope.siglasProyecto = $localStorage.proyecto.pro_sigla;
  $scope.siglasSubsistema = $localStorage.subsistema.sub_sigla;
  $scope.listamodulos = listamodulos.data;
  $scope.idproyecto = idproyecto;
  $scope.registro = false;
  $scope.toaster = {
    type: 'success',
    title: 'Titulo',
    text: 'Message'
  };
  
  var variablesArrayFocus = [];
$scope.variables = function (modulo) {
  $localStorage.modulo = modulo;
  $state.go('app.variablesDesc',{idproyecto:idproyecto,idsubsistema:idsubsistema,idmodulo:modulo.mod_id});
}

  $scope.addModulo = function() {

   
   console.log($scope.peso);
   $http.post('/api/modulos/'+idsubsistema, {peso : $scope.peso, peso2 : $scope.peso2, peso3 : $scope.peso3,nombre: $scope.nombre, descripcioncorta:$scope.descripcioncorta , sigla:$scope.sigla , descripcionlarga:$scope.descripcionlarga }).success(function(data, status) {
    $scope.status = status;
    $scope.data = data;

    
    $scope.authError = '';
    $scope.authSuccess = data[0].msj;
    $scope.toaster.title = "Módulo creado";
    $scope.toaster.text = data[0].msj;
    $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadModulos();
          $scope.registro = false;
          
        }).
   error(function(data, status, headers, config) {
    $scope.status = status;
    $scope.toaster.title = "Error";
    $scope.toaster.text = "No se pudo registrar el nuevo módulo, posiblemente es porblema de nosotros y no de usted";
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
      //angular.element("#chosen2").trigger("chosen:updated");
    }
    
    $scope.updateChosen = function () {
      //angular.element("#chosen2").trigger("chosen:updated");
      console.log('Cambio!!!!!!!')
    }
    $scope.borrar = function (modulo) {
      console.log(modulo);
      $http.delete('/api/modulos/'+modulo.mod_id).success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log($scope);
        
        $scope.toaster.title = "Modulo Eliminado";
        $scope.toaster.text = data[0].msj;
        $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadModulos();
          //$state.go($state.current, {}, {reload: true});
        }).
      error(function(data, status, headers, config) {
        $scope.status = status;
        $scope.toaster.title = "Error";
        $scope.toaster.text = "No se pudo borrar el modulo, posiblemente es porblema de nosotros y no de usted";
        $scope.toaster.type = "error";
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        $scope.authSuccess = '';
        console.log($scope);
      });
    }

    $scope.reloadModulos = function() {
      modulosFactory.getListaModulosById(idsubsistema).then(function(response) {
        console.log(response);
        $scope.listamodulos = response.data;
      })
    }

    $scope.selectFocus = function (modulo) {
     $scope.modulofocus = modulo;
     $scope.editar();
     console.log($scope.modulofocus);
   }

   $scope.editar = function(modulo) {
    $scope.formEdit.$setPristine();
    $scope.modulofocus = modulo;
    $scope.editando = true;
    $scope.variablesArrayFocus = [];
    angular.element("#chosen2").chosen("destroy").chosen();
    

  }

  $scope.editModulo = function() {
   
    console.log($scope.modulofocus);
    
    $http.put('/api/modulos/'+$scope.modulofocus.mod_id, { var1: $scope.modulofocus.mod_var1 , var2 : $scope.modulofocus.mod_var2, var3 :$scope.modulofocus.mod_var3, peso:$scope.modulofocus.mod_peso, peso2:$scope.modulofocus.mod_peso2, peso3:$scope.modulofocus.mod_peso3, nombre:$scope.modulofocus.mod_nombre, sigla:$scope.modulofocus.mod_sigla, descripcioncorta:$scope.modulofocus.mod_descripcioncorta, descripcionlarga:$scope.modulofocus.mod_descripcionlarga}).success(function(data, status) {
      $scope.status = status;
      $scope.data = data;
      console.log($scope);
      
      $scope.authError = '';
      $scope.authSuccess = data[0].msj;
      $scope.toaster.title = "modulo editado";
      $scope.toaster.text = data[0].msj;
      $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.formEdit.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadModulos();
          $scope.editando = false;
          
        }).
    error(function(data, status, headers, config) {
      $scope.status = status;
      $scope.toaster.title = "Error";
      $scope.toaster.text = "No se pudo editar el modulo, posiblemente es problema de nosotros y no de usted";
      $scope.toaster.type = "error";
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
      $scope.authSuccess = '';
      console.log($scope);
    });
    
  };

});
