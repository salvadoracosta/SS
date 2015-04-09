'use strict';

angular.module('app.controllers')
.controller('PesoDescCtrl', function ($scope,$http,toaster,pesos,pesosFactory,idproyecto, $state){
  console.log("toaster",toaster);
  console.log("idproyecto de pesos", idproyecto);
  var a_pesos = pesos.data;
  console.log("arreglo de datos", a_pesos);
  $scope.toaster = {
    type: 'success',
    title: 'Titulo',
    text: 'Message'
  };
  var s1_id;
  var s2_id;
  var s3_id;

  $scope.proyecto = a_pesos[0].pn;
  /* Subsistemas */
  if(a_pesos[0].sn ==null){
    console.log("No hay Subsistemas");
    $scope.sub1 = "no definido";
    $scope.sub2 = "no definido";
    $scope.sub3 = "no definido";
    $scope.s1 = 0;
    $scope.s2 = 0;
    $scope.s3 = 0;
  }else{ //hay al menos un subsistema
    $scope.sub1 = a_pesos[0].sn;
    $scope.s1 = a_pesos[0].sp;
    s1_id = a_pesos[0].si;
    for(var i = 1; i < a_pesos.length;i++){
      console.log(a_pesos[i]);
      if(a_pesos[i].sn != $scope.sub1){
        $scope.sub2 = a_pesos[i].sn;
        $scope.s2 = a_pesos[i].sp;
        s2_id = a_pesos[i].si;
        break;
      }
    }
    if($scope.sub2 == null){ //solo hay un subsistema
      $scope.sub2 = "no definido";
      $scope.s2 = 0;
      $scope.sub3 = "no definido";
      $scope.s3 = 0;
    }else{
      for(var i = 1; i < a_pesos.length;i++){
        console.log(a_pesos[i]);
        if(a_pesos[i].sn != $scope.sub1 && a_pesos[i].sn != $scope.sub2){
          $scope.sub3 = a_pesos[i].sn;
          $scope.s3 = a_pesos[i].sp;
          s3_id = a_pesos[i].si;
          break;
        }
      }
      if($scope.sub3 == null){
        $scope.sub3 = "no definido";
        $scope.s3 = 0;
      }
    }
  }

  if($scope.sub1 != "no definido" && $scope.sub2 != "no definido" && $scope.sub3 !="no definido"){
    $scope.s1 = 0.3;
    $scope.s2 = 0.3;
    $scope.s3 = 0.3;
  }else if($scope.sub1 != "no definido" && $scope.sub2 != "no definido"){
    $scope.s1 = 0.5;
    $scope.s2 = 0.5;
  }else{
    $scope.s1 = 1;
  }


  var updateModel = function(val){
    $scope.$apply(function(){
      if($scope.sub1 !="no definido" && $scope.sub2 !="no definido" && $scope.sub3!= "no definido"){
        $scope.s1 = 0.3;
        $scope.s2 = 0.3;
        $scope.s3 = 0.3;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      }else if($scope.sub1 !="no definido" && $scope.sub2 =="no definido" && $scope.sub3!="no definido"){
        $scope.s2 = 0;
        $scope.s1 = val;
        $scope.s3 = 1-$scope.s1;
        $scope.s3 = parseFloat(parseFloat($scope.s3).toFixed(1));
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      }else if($scope.sub1 != "no definido" && $scope.sub2!="no definido" && $scope.sub3 =="no definido"){
        $scope.s3 = 0;
        $scope.s1 = val;
        $scope.s2 = 1-$scope.s1;
        $scope.s2 = parseFloat(parseFloat($scope.s2).toFixed(1));
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 !="no definido" && $scope.sub2 == "no definido" && $scope.sub3 == "no definido"){
        $scope.s1 = 1;
        $scope.s2 = 0;
        $scope.s3 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 =="no definido" && $scope.sub2 !="no definido" && $scope.sub3 =="no definido") {
        $scope.s1 = 0;
        $scope.s2 = 1;
        $scope.s3 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 =="no definido" && $scope.sub2 =="no definido" && $scope.sub3 !="no definido"){
        $scope.s1 = 0;
        $scope.s2 = 0;
        $scope.s3 = 1;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      }else if($scope.sub1 == "no definido"){
        $scope.s1 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
      } 
    });
  };
 
  var updateModel2 = function(val){
    $scope.$apply(function(){
     if($scope.sub1 !="no definido" && $scope.sub2 !="no definido" && $scope.sub3!= "no definido"){
        $scope.s1 = 0.3;
        $scope.s2 = 0.3;
        $scope.s3 = 0.3;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      }else if($scope.sub1 =="no definido" && $scope.sub2 !="no definido" && $scope.sub3!="no definido"){
        $scope.s2 = val;
        $scope.s3 = 1-val;
        $scope.s3 = parseFloat(parseFloat($scope.s3).toFixed(1));
        $scope.s1 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 !="no definido"&& $scope.sub2!="no definido" && $scope.sub3 =="no definido" ){
        $scope.s2 =val;
        $scope.s1 = 1- $scope.s2;
        $scope.s1 = parseFloat(parseFloat($scope.s1).toFixed(1));
        $scope.s3 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 !="no definido" && $scope.sub2 == "no definido" && $scope.sub3 == "no definido"){
        $scope.s1 = 1;
        $scope.s2 = 0;
        $scope.s3 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 =="no definido" && $scope.sub2 !="no definido" && $scope.sub3 =="no definido") {
        $scope.s1 = 0;
        $scope.s2 = 1;
        $scope.s3 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 =="no definido" && $scope.sub2 =="no definido" && $scope.sub3 !="no definido"){
        $scope.s1 = 0;
        $scope.s2 = 0;
        $scope.s3 = 1;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub2 == "no definido"){
        $scope.s2 = 0;
        angular.element("#slider2").slider('setValue',$scope.s2);
      } 
    });
  };

  var updateModel3 = function(val){
    $scope.$apply(function(){
      if($scope.sub1 !="no definido" && $scope.sub2 !="no definido" && $scope.sub3!= "no definido"){
        $scope.s1 = 0.3;
        $scope.s2 = 0.3;
        $scope.s3 = 0.3;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      }else if($scope.sub1 =="no definido" && $scope.sub2 !="no definido" && $scope.sub3!="no definido"){
        $scope.s3 = val;
        $scope.s2 = 1-$scope.s3;
        $scope.s2 = parseFloat(parseFloat($scope.s2).toFixed(1));
        $scope.s1 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
      } else if($scope.sub1 !="no definido" && $scope.sub2 =="no definido" && $scope.sub3 !="no definido"){
        $scope.s3 = val;
        $scope.s2 =0;
        $scope.s1 = 1-$scope.s3;
        $scope.s1 = parseFloat(parseFloat($scope.s1).toFixed(1));
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
      }else if($scope.sub1 !="no definido" && $scope.sub2 == "no definido" && $scope.sub3 == "no definido"){
        $scope.s1 = 1;
        $scope.s2 = 0;
        $scope.s3 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 =="no definido" && $scope.sub2 !="no definido" && $scope.sub3 =="no definido") {
        $scope.s1 = 0;
        $scope.s2 = 1;
        $scope.s3 = 0;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } else if($scope.sub1 =="no definido" && $scope.sub2 =="no definido" && $scope.sub3 !="no definido"){
        $scope.s1 = 0;
        $scope.s2 = 0;
        $scope.s3 = 1;
        angular.element("#slider").slider('setValue',$scope.s1);
        angular.element("#slider2").slider('setValue',$scope.s2);
        angular.element("#slider3").slider('setValue',$scope.s3);
      } if($scope.sub3 == "no definido"){
        $scope.s3 = 0;
        angular.element("#slider3").slider('setValue',$scope.s3);
      }
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

  $scope.addPesos = function() {
    console.log("SCOPPEEEEEEEEEEE", $scope);
     $http.put('/api/pesos/'+idproyecto, {id_proyecto: idproyecto,sub1_id:s1_id,sub1_peso:$scope.s1,sub2_id:s2_id,sub2_peso:$scope.s2,sub3_id:s3_id,sub3_peso:$scope.s3}).success(function(data, status) {      
      $scope.toaster.title = "Pesos Registrados";
      $scope.toaster.text = data[0].msj;
      $scope.toaster.type = "success"
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
     });
     error(function(data, status, headers, config) {

       $scope.toaster.title = "Error";
       $scope.toaster.text = "No se pudo registrar los pesos";
       $scope.toaster.type = "error";
       toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
     });     
  };

  $scope.notshow = function(){ 
    $state.go('app.proyectoDesc');
  };
  




});