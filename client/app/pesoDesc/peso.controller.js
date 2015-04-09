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
  /* Subsistemas del proyecto */
  var s1_id;
  var s2_id;
  var s3_id;
  /* Modulos de Subsistema 1*/
  var m11_id;
  var m12_id;
  var m13_id;
  /*Variables subsistema 1 modulo 1 */
  var v111_id;
  var v112_id;
  var v112_id;


  $scope.proyecto = a_pesos[0].pn;
  /* Subsistemas */
  if(a_pesos[0].sn == null){
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
  if($scope.sub1 =="no definido" && $scope.sub2 == "no definido" && $scope.sub3 == "no definido"){
    $scope.s1 = 0;
    $scope.s2 = 0;
    $scope.s3 = 0;
  }else if($scope.sub1 != "no definido" && $scope.s1 != null && $scope.sub2 != "no definido" && $scope.s2 !=null && $scope.sub3 =="no definido"){
    $scope.s3 = 0;
  }else if($scope.sub1 != "no definido" && $scope.sub2 != "no definido" && $scope.sub3 !="no definido"){
    $scope.s1 = 0.3;
    $scope.s2 = 0.3;
    $scope.s3 = 0.3;
  }else if($scope.sub1 != "no definido" && $scope.sub2 != "no definido"){
    $scope.s1 = 0.5;
    $scope.s2 = 0.5;
  }else{
    $scope.s1 = 1;
  }

/* Modulos susbsitema 1 */
$scope.mod11 = a_pesos[0].mn;
if( $scope.mod11 == null ){
  console.log("no hay modulo en el subsistema");
  $scope.mod11 = "no definido";
  $scope.mod12 = "no definido";
  $scope.mod13 = "no definido";
  $scope.m11 = 0;
  $scope.m12 = 0;
  $scope.m13 = 0;
}else{
  $scope.m11 = a_pesos[0].mp;
  m11_id = a_pesos[0].mi;
  for(var i = 1; i < a_pesos.length;i++){
    if(a_pesos[i].mn != $scope.mod11 && a_pesos[i].sn == $scope.sub1){
      $scope.mod12 = a_pesos[i].mn;
      $scope.m12 = a_pesos[i].mp;
      m12_id = a_pesos[i].mi;
      break; 
    }
  }
  if($scope.mod12 == null){ //no hay segundo modulo
    $scope.mod12 = "no definido";
    $scope.m12 = 0;
    $scope.mod13 = "no definido";
    $scope.m13 = 0;
  }else{
    for(var i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn != $scope.mod11 && a_pesos[i].mn != $scope.mod12 && a_pesos[i].sn == $scope.sub1){
        $scope.mod13 = a_pesos[i].mn;
        $scope.m13 = a_pesos[i].mp;
        m13_id = a_pesos[i].mi;
      }
    }
    if($scope.mod13 == null){
      $scope.mod13 = "no definido";
      $scope.m13 = 0;
    }
  }
}
if($scope.mod11 !="no definido" && $scope.mod12 != "no definido" && $scope.mod13 != "no definido"){
  $scope.m11 = 0.3;
  $scope.m12 = 0.3;
  $scope.m13 = 0.3; 
}else if($scope.mod11 !="no definido" && $scope.mod12 == "no definido" && $scope.mod13 == "no definido"){
  $scope.m11 = 1;
  $scope.m12 = 0;
  $scope.m13 = 0;
}else if($scope.mod11 != "no definido" && $scope.m11 != null && $scope.mod12 != "no definido" && $scope.m12 !=null && $scope.mod13 =="no definido"){
  $scope.m13 = 0;
}else if($scope.mod11 != "no definido" && $scope.mod12 != "no definido" && $scope.mod13 =="no definido"){
  $scope.m11 = 0.5;
  $scope.m12 = 0.5;
  $scope.m13 = 0;
}

$scope.var111 = "var 1";
$scope.var112 = "var 2";
$scope.var113 = "var 3";
$scope.v111 = 0;
$scope.v112 = 0;
$scope.v113 = 0;

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

  /*Modulo 1 subsistema 1*/
  var updateModel4 = function(val){
     $scope.$apply(function(){
      if($scope.mod11 == "no definido" && $scope.mod12 == "no definido" && $scope.mod13 == "no definido"){
        $scope.m11 = 0;
        $scope.m12 = 0;
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else if($scope.mod11 != "no definido" && $scope.mod12 !="no definido" && $scope.mod13 != "no definido"){
        $scope.m11 = 0.3;
        $scope.m12 = 0.3;
        $scope.m13 = 0.3;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else if($scope.mod11 != "no definido" && $scope.mod12 == "no definido" && $scope.mod13 =="no definido"){
        $scope.m11 = 1;
        $scope.m12 = 0;
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else if($scope.mod11 != "no definido" && $scope.mod12 != "no definido" && $scope.mod13 =="no definido"){
        $scope.m11 = val;
        $scope.m12 = 1 - $scope.m11 ;
        $scope.m12 = parseFloat(parseFloat($scope.m12).toFixed(1));
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }

     }); 
  }
  /* Modulo 2 subsistema 1*/
  var updateModel5 = function(val){
     $scope.$apply(function(){
      if($scope.mod11 == "no definido" && $scope.mod12 == "no definido" && $scope.mod13 == "no definido"){
        $scope.m11 = 0;
        $scope.m12 = 0;
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else if($scope.mod11 != "no definido" && $scope.mod12 !="no definido" && $scope.mod13 != "no definido"){
        $scope.m11 = 0.3;
        $scope.m12 = 0.3;
        $scope.m13 = 0.3;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else if($scope.mod11 != "no definido" && $scope.mod12 == "no definido" && $scope.mod13 =="no definido"){
        $scope.m11 = 1;
        $scope.m12 = 0;
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else if($scope.mod11 != "no definido" && $scope.mod12 != "no definido" && $scope.mod13 =="no definido"){
        $scope.m12 = val;
        $scope.m11 = 1 - $scope.m12 ;
        $scope.m11 = parseFloat(parseFloat($scope.m11).toFixed(1));
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }

     }); 
  }

  /*Modulo 3 subsistema 1*/
  var updateModel6 = function(val){
     $scope.$apply(function(){
      if($scope.mod11 == "no definido" && $scope.mod12 == "no definido" && $scope.mod13 == "no definido"){
        $scope.m11 = 0;
        $scope.m12 = 0;
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);

      }else if($scope.mod11 != "no definido" && $scope.mod12 !="no definido" && $scope.mod13 != "no definido"){
        $scope.m11 = 0.3;
        $scope.m12 = 0.3;
        $scope.m13 = 0.3;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else if($scope.mod11 != "no definido" && $scope.mod12 == "no definido" && $scope.mod13 =="no definido"){
        $scope.m11 = 1;
        $scope.m12 = 0;
        $scope.m13 = 0;
        angular.element("#slider4").slider('setValue',$scope.m11);
        angular.element("#slider5").slider('setValue',$scope.m12);
        angular.element("#slider6").slider('setValue',$scope.m13);
      }else{
        $scope.m13 = 0;
        angular.element("#slider6").slider('setValue',$scope.m13);
      }

     }); 
  }

  /*Variable1 modulo1 subsistema 1*/
  var updateModel7 =function(val){
     $scope.$apply(function(){
      if($scope.var111 == "no definido"  && $scope.var112 == "no definido" && $scope.var113 == "no definido"){
        $scope.v111 = 0;
        $scope.v112 = 0;
        $scope.v113 = 0;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }else if($scope.var111 != "no definido" &&  $scope.var112 != "no definido" && $scope.var113 !="no definido"){
        $scope.v111 = 0.3;
        $scope.v112 = 0.3;
        $scope.v113 = 0.3;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }
     });
  }

  /*Variable 2 modulo1 subsistema 1*/
  var updateModel8 =function(val){
     $scope.$apply(function(){
      if($scope.var111 == "no definido"  && $scope.var112 == "no definido" && $scope.var113 == "no definido"){
        $scope.v111 = 0;
        $scope.v112 = 0;
        $scope.v113 = 0;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }else if($scope.var111 != "no definido" &&  $scope.var112 != "no definido" && $scope.var113 !="no definido"){
        $scope.v111 = 0.3;
        $scope.v112 = 0.3;
        $scope.v113 = 0.3;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }
     });
  }

  /*Variable 3 modulo1 subsistema 1*/
  var updateModel9 =function(val){
     $scope.$apply(function(){
      if($scope.var111 == "no definido"  && $scope.var112 == "no definido" && $scope.var113 == "no definido"){
        $scope.v111 = 0;
        $scope.v112 = 0;
        $scope.v113 = 0;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }else if($scope.var111 != "no definido" &&  $scope.var112 != "no definido" && $scope.var113 !="no definido"){
        $scope.v111 = 0.3;
        $scope.v112 = 0.3;
        $scope.v113 = 0.3;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }
     });
  }


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

  $scope.addPesos = function() {
    console.log("SCOPPEEEEEEEEEEE", $scope);
     $http.put('/api/pesos/'+idproyecto, {id_proyecto: idproyecto,sub1_id:s1_id,sub1_peso:$scope.s1,sub2_id:s2_id,sub2_peso:$scope.s2,sub3_id:s3_id,sub3_peso:$scope.s3,mod11_id:m11_id,mod11_peso:$scope.m11,mod12_id:m12_id,mod12_peso:$scope.m12,mod13_id:m13_id, mod13_peso:$scope.m13}).success(function(data, status) {      
      $scope.toaster.title = "Pesos Registrados";
      $scope.toaster.text = data[0].msj;
      $scope.toaster.type = "success"
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
     });   
  };

  $scope.notshow = function(){ 
    $state.go('app.proyectoDesc');
  };


});