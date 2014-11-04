'use strict';

angular.module('app.controllers')
  .controller('ModuloCtrl', function ($scope,$http,toaster, listamodulos, modulosFactory) {
    console.log(toaster);
    console.log(listamodulos);
    console.log(modulosFactory);
    $scope.listamodulos = listamodulos.data;
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
    Funcion para registrar un modulo
    */
    $scope.peso =0.3;
    $scope.peso2 =0.3;
    $scope.peso3 =0.3;
    var updateModel = function(val){
      console.log(val);
      $scope.$apply(function(){
        $scope.peso = val;
        $scope.peso2 = (1-val)/2;
        $scope.peso3 = (1-val)/2;
        angular.element("#slider2").slider('setValue',$scope.peso2);
        angular.element("#slider3").slider('setValue',$scope.peso3);
      });
    };
    var updateModel2 = function(val){
      $scope.$apply(function(){
        $scope.peso2 = val;
        $scope.peso = (1-val)/2;
        $scope.peso3 = (1-val)/2;
        angular.element("#slider").slider('setValue',$scope.peso);
        angular.element("#slider3").slider('setValue',$scope.peso3);
        
      });
    };
    var updateModel3 = function(val){
      $scope.$apply(function(){
        $scope.peso3 = val;
        
        $scope.peso = (1-val)/2;
        $scope.peso2 = (1-val)/2;
        angular.element("#slider").slider('setValue',$scope.peso);
        angular.element("#slider2").slider('setValue',$scope.peso2);

        
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
      //console.log(angular.element("#slider2").slider('setValue',0.8));
     
    });
    angular.element("#slider2").on('slideStop', function(data){
      updateModel2(data.value);
    });
    angular.element("#slider3").on('slideStop', function(data){
      updateModel3(data.value);
    });

    $scope.addModulo = function() {
       console.log($scope);
          console.log($scope.peso);
      $http.post('/api/modulos', { var1: $scope.var1 , var2 : $scope.var2 , var3 : $scope.var3, peso : $scope.peso, peso2 : $scope.peso2, peso3 : $scope.peso3,nombre: $scope.nombre, sigla:$scope.sigla }).success(function(data, status) {
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
      modulosFactory.getListaModulos().then(function(response) {
        console.log(response);
        $scope.listamodulos = response.data;
      })
    }

    $scope.editar = function(modulo) {
      $scope.modulofocus = modulo;
      $scope.editando = true;
      console.log($scope.modulofocus);
    }

    $scope.editModulo = function() {
      $http.put('/api/modulos/'+$scope.modulofocus.mod_id, { var1: $scope.modulofocus.mod_var1 , var2 : $scope.modulofocus.mod_var2, var3 :$scope.modulofocus.mod_var3, peso:$scope.modulofocus.mod_peso, peso2:$scope.modulofocus.mod_peso2, peso3:$scope.modulofocus.mod_peso3, nombre:$scope.modulofocus.mod_nombre, sigla:$scope.modulofocus.mod_sigla}).success(function(data, status) {
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
