'use strict';

angular.module('app.controllers')
  .controller('ModuloCtrl', function ($scope,$http,toaster, listamodulos, modulosFactory, listavariables) {
    console.log(toaster);
    console.log(listamodulos);
    console.log(listavariables);
    $scope.listavariables = listavariables.data;
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
    /*
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
    $scope.modulofocus = {};
    $scope.modulofocus.mod_peso =0.3;
    $scope.modulofocus.mod_peso2 =0.3;
    $scope.modulofocus.mod_peso3 =0.3;
    
    var updateModelFocus = function(val){
      console.log(val);
      $scope.$apply(function(){
        $scope.modulofocus.mod_peso = val;
        $scope.modulofocus.mod_peso2 = (1-val)/2;
        $scope.modulofocus.mod_peso3 = (1-val)/2;
        angular.element("#slider2Focus").slider('setValue',$scope.modulofocus.mod_peso2);
        angular.element("#slider3Focus").slider('setValue',$scope.modulofocus.mod_peso3);
      });
    };
    var updateModelFocus2 = function(val){
      $scope.$apply(function(){
        $scope.modulofocus.mod_peso2 = val;
        $scope.modulofocus.mod_peso = (1-val)/2;
        $scope.modulofocus.mod_peso3 = (1-val)/2;
        angular.element("#sliderFocus").slider('setValue',$scope.modulofocus.mod_peso);
        angular.element("#slider3Focus").slider('setValue',$scope.modulofocus.mod_peso3);
        
      });
    };
    var updateModelFocus3 = function(val){
      $scope.$apply(function(){
        $scope.modulofocus.mod_peso3 = val;
        
        $scope.modulofocus.mod_peso = (1-val)/2;
        $scope.modulofocus.mod_peso2 = (1-val)/2;
        angular.element("#sliderFocus").slider('setValue',$scope.modulofocus.mod_peso);
        angular.element("#slider2Focus").slider('setValue',$scope.modulofocus.mod_peso2);

        
      });
    };
    angular.element("#sliderFocus").on('slideStop', function(data){
      updateModelFocus(data.value);
      //console.log(angular.element("#slider2").slider('setValue',0.8));
     
    });
    angular.element("#slider2Focus").on('slideStop', function(data){
      updateModelFocus2(data.value);
    });
    angular.element("#slider3Focus").on('slideStop', function(data){
      updateModelFocus3(data.value);
    });
  */
  var variablesArrayFocus = [];
    $scope.addModulo = function() {

       var variablesArray = angular.element("#chosen1").val();
      $scope.var1 = variablesArray[0];
      $scope.var2 = variablesArray[1];
      $scope.var3 = variablesArray[2];
          console.log($scope.peso);
      $http.post('/api/modulos', { var1: $scope.var1 , var2 : $scope.var2 , var3 : $scope.var3, peso : $scope.peso, peso2 : $scope.peso2, peso3 : $scope.peso3,nombre: $scope.nombre, descripcioncorta:$scope.descripcioncorta , sigla:$scope.sigla , descripcionlarga:$scope.descripcionlarga }).success(function(data, status) {
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
      modulosFactory.getListaModulos().then(function(response) {
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
      //angular.element("#chosen2").trigger("chosen:updated");
      //angular.element("#chosen2").trigger("chosen:updated");
      //updateModelFocus(modulo.mod_peso);
      //updateModelFocus2(modulo.mod_peso2);
      //updateModelFocus3(modulo.mod_peso3);
     

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
