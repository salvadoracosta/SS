'use strict';

angular.module('app.controllers')
.controller('FuncionesCtrl', function ($scope,$http,toaster, listafunciones, funcionesFactory) {
  console.log(listafunciones);
  console.log(toaster);
  $scope.listafunciones = listafunciones.data;
    //$scope.items = [{htmlField:'<p>stuff</p>'},{htmlField:'<p>more stuff</p>'}];
    //console.log(proyectosFactory);
    //$scope.listaproyectos = listaproyectos.data;
    $scope.registro = false;
    $scope.toaster = {
      type: 'success',
      title: 'Titulo',
      text: 'Message'
    };
    $scope.v1 =0.3;
    $scope.v2 =0.3; 
    $scope.v3 =0.3;
    $scope.v4 =0.3;
    $scope.v5 =0.3;
    $scope.v6 =0.3;
    $scope.v7 =0.3;
    $scope.v8 =0.3;
    $scope.v9=0.3;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.v1 = val;
      });
    };
    var updateModel2 = function(val){
      $scope.$apply(function(){
        $scope.v2 = val;
      });
    }; 
     var updateModel3 = function(val){
      $scope.$apply(function(){
        $scope.v3 = val;
      });
    }; 
     var updateModel4 = function(val){
      $scope.$apply(function(){
        $scope.v4 = val;
      });
    };
    var updateModel5 = function(val){
      $scope.$apply(function(){
        $scope.v5 = val;
      });
    };  
    var updateModel6 = function(val){
      $scope.$apply(function(){
        $scope.v6 = val;
      });
    }; 
     var updateModel7 = function(val){
      $scope.$apply(function(){
        $scope.v7 = val;
      });
    }; 
     var updateModel8 = function(val){
      $scope.$apply(function(){
        $scope.v8 = val;
      });
    };
      var updateModel9 = function(val){
      $scope.$apply(function(){
        $scope.v9 = val;
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
    });

    angular.element("#slider2").on('slideStop', function(data){
      updateModel2(data.value);
    });
    angular.element("#slider3").on('slideStop', function(data){
      updateModel3(data.value);
    });
    angular.element("#slider4").on('slideStop', function(data){
      updateModel4(data.value);
    });
    angular.element("#slider5").on('slideStop', function(data){
      updateModel5(data.value);
    });
    angular.element("#slider6").on('slideStop', function(data){
      updateModel6(data.value);
    });
    angular.element("#slider7").on('slideStop', function(data){
      updateModel7(data.value);
    });
    angular.element("#slider8").on('slideStop', function(data){
      updateModel8(data.value);
    });
    angular.element("#slider9").on('slideStop', function(data){
      updateModel9(data.value);
    });


    $scope.addFuncion = function() {
      console.log($scope);
      $http.post('/api/funciones', { nombre: $scope.nombre, comentario:$scope.comentario, v1: $scope.v1 , v2: $scope.v2 , v3: $scope.v3, v4: $scope.v4,v5: $scope.v5,v6: $scope.v6,v7: $scope.v7,v8: $scope.v8,v9: $scope.v9}).success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log($scope);

        $scope.authError = '';
        $scope.authSuccess = data[0].msj;
        $scope.toaster.title = "Funcion creada";
        $scope.toaster.text = data[0].msj;
        $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadFunciones();
          $scope.registro = false;
          
        }).
      error(function(data, status, headers, config) {
        $scope.status = status;
        $scope.toaster.title = "Error";
        $scope.toaster.text = "No se pudo registrar la funcion, posiblemente es porblema de nosotros y no de usted";
        $scope.toaster.type = "error";
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        $scope.authSuccess = '';
        console.log($scope);
      });
      
    };

    $scope.showregistro = function () {
      $scope.registro = true;
    }

    $scope.getTipo = function (tipo) {
      console.log(tipo);
      switch(tipo) {
        case 0:
        return 'Pesimista';
        break;
        case 1:
        return 'Lineal';
        break;
        case 2:
        return 'Optimista';
        break;    
        default:
        return 'No Definida';
      }
    }

    $scope.notshowregistro = function () {
      $scope.form.$setPristine();
      $scope.registro = false;
    }
    $scope.notshowEdit = function () {
      $scope.formEdit.$setPristine();
      $scope.editando = false;
    }

    $scope.borrar = function (funcion) {
      console.log(funcion);
      $http.delete('/api/funciones/'+funcion.fun_id).success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log($scope);

        $scope.toaster.title = "Funcion Eliminada";
        $scope.toaster.text = data[0].msj;
        $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadFunciones();
          //$state.go($state.current, {}, {reload: true});
        }).
      error(function(data, status, headers, config) {
        $scope.status = status;
        $scope.toaster.title = "Error";
        $scope.toaster.text = "No se pudo borrar la Funcion, posiblemente es porblema de nosotros y no de usted";
        $scope.toaster.type = "error";
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        $scope.authSuccess = '';
        console.log($scope);
      });
    }
    
    $scope.reloadFunciones = function() {
      funcionesFactory.getListaFunciones().then(function(response) {
        console.log(response);
        $scope.listafunciones = response.data;
      })
    }

    $scope.editar = function(funcion) {
      $scope.funcionfocus = funcion;
      $scope.editando = true;
      console.log($scope.funcionfocus);
    }

    $scope.editFuncion = function() {
      $http.put('/api/funciones/'+$scope.funcionfocus.fun_id, { tipo: $scope.funcionfocus.fun_tipo, v1: $scope.funcionfocus.fun_val1 , v2: $scope.funcionfocus.fun_val2 , v3: $scope.funcionfocus.fun_val3, v4: $scope.funcionfocus.fun_val4,v5: $scope.funcionfocus.fun_val5,v6: $scope.funcionfocus.fun_val6,v7: $scope.funcionfocus.fun_val7,v8: $scope.funcionfocus.fun_val8,v9: $scope.funcionfocus.fun_val9, com1: $scope.funcionfocus.fun_com1 , com2: $scope.funcionfocus.fun_com2 , com3: $scope.funcionfocus.fun_com3, com4: $scope.funcionfocus.fun_com4,com5: $scope.funcionfocus.fun_com5,com6: $scope.funcionfocus.fun_com6,com7: $scope.funcionfocus.fun_com7,com8: $scope.funcionfocus.fun_com8,com9: $scope.funcionfocus.fun_com9}).success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        console.log($scope);

        $scope.authError = '';
        $scope.authSuccess = data[0].msj;
        $scope.toaster.title = "Funcion editada";
        $scope.toaster.text = data[0].msj;
        $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.formEdit.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadFunciones();
          $scope.editando = false;
          
        }).
      error(function(data, status, headers, config) {
        $scope.status = status;
        $scope.toaster.title = "Error";
        $scope.toaster.text = "No se pudo editar la funcion, posiblemente es porblema de nosotros y no de usted";
        $scope.toaster.type = "error";
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        $scope.authSuccess = '';
        console.log($scope);
      });
      
    };

  });
