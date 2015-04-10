'use strict';

angular.module('app.controllers')
.controller('PesoDescCtrl', function ($scope,$http,toaster,pesos,pesosFactory,idproyecto, $state){
  console.log('toaster',toaster);
  console.log('idproyecto de pesos', idproyecto);
  var a_pesos = pesos.data;
  console.log('arreglo de datos', a_pesos);
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
  var v113_id;

  /*Variables subsistema 1 modulo 2*/
  var v121_id;
  var v122_id;
  var v123_id;

  /*Variables subsistema 1 modulo 3*/
  var v131_id;
  var v132_id;
  var v133_id; 

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
    if($scope.s1 + $scope.s2 !=1 ){
      $scope.s1 = 0.5;
      $scope.s2 = 0.5;
    }
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
  if($scope.m11 + $scope.m12 !=1){
    $scope.m11 = 0.5;
    $scope.m12 = 0.5;
  }
  $scope.m13 = 0;
}else if($scope.mod11 != "no definido" && $scope.mod12 != "no definido" && $scope.mod13 =="no definido"){
  $scope.m11 = 0.5;
  $scope.m12 = 0.5;
  $scope.m13 = 0;
}

/*Variables modulo 1*/
$scope.var111 = a_pesos[0].vn;
if($scope.var111 == null){
  $scope.var111 = 'no definido';
  $scope.var112 = 'no definido';
  $scope.var113 = 'no definido';
  $scope.v111 = 0;
  $scope.v112 = 0;
  $scope.v113 = 0;
}else{ //hay al menos una variable
  $scope.v111 = a_pesos[0].vp;
  v111_id = a_pesos[0].vi;
  for(var i = 1; i < a_pesos.length;i++){
    if($scope.var111 != a_pesos[i].vn && a_pesos[i].mn == $scope.mod11 && a_pesos[i].sn == $scope.sub1){
      $scope.var112 = a_pesos[i].vn;
      $scope.v112 = a_pesos[i].vp;
      v112_id = a_pesos[i].vi;
    }
  }
  if($scope.var112 == null){
    $scope.var112 = "no definido";
    $scope.v112 = 0;
    $scope.var113 = "no definido";
    $scope.v113 = 0;
  }else{
    for(var j = 1; j < a_pesos.length;j++){
      if($scope.var111 != a_pesos[j].vn && $scope.var112 != a_pesos[j].vn && a_pesos[j].mn == $scope.mod11 && a_pesos[j].sn == $scope.sub1 ){
        $scope.var113 = a_pesos[j].vn;
        $scope.v113 = a_pesos[j].vp;
        v113_id = a_pesos[j].vi;
      }
    }
  }
}

if($scope.var111 =="no definido" && $scope.var112 == "no definido" && $scope.var113 == "no definido"){
  $scope.v111 = 0;
  $scope.v112 = 0;
  $scope.v113 = 0;
}else if($scope.var111 != "no definido" && $scope.var112 == "no definido" && $scope.var113 == "no definido"){
  $scope.v111 = 1;
  $scope.v112 = 0;
  $scope.v113 = 0;
}else if($scope.var111 != "no definido" && $scope.v111 != null && $scope.var112 != "no definido" && $scope.v112 !=null && $scope.var113 == "no definido"){
  if($scope.v111 + $scope.v112 != 1){
    $scope.v111 = 0.5;
    $scope.v112 = 0.5;
  }
  $scope.v113 = 0;
} else if($scope.var111 != "no definido" && $scope.var112 != "no definido" && $scope.var113 == "no definido"){
  $scope.v111 = 0.5;
  $scope.v112 = 0.5;
  $scope.v113 = 0;
} else{
  $scope.v111 = 0.3;
  $scope.v112 = 0.3;
  $scope.v113 = 0.3;
}


/*Variables modulo 2*/
for (var i = 1; i < a_pesos.length;i++){
  if($scope.sub1 == a_pesos[i].sn && $scope.mod12 == a_pesos[i].mn){
    $scope.var121 = a_pesos[i].vn;
    $scope.v121 = a_pesos[i].vp;
    v121_id = a_pesos[i].vi;
    break;
  }
}
if($scope.var121 == null){ //no hay variables
  $scope.var121 = "no definido";
  $scope.var122 = "no definido";
  $scope.var123 = "no definido";
  $scope.v121 = 0;
  $scope.v122 = 0;
  $scope.v123 = 0;
}else{
  for(var i = 1; i < a_pesos.length;i++){
    if($scope.sub1 == a_pesos[i].sn && $scope.mod12 == a_pesos[i].mn && $scope.var121 != a_pesos[i].vn ){
      $scope.var122 = a_pesos[i].vn;
      $scope.v122 = a_pesos[i].vp;
      v122_id = a_pesos[i].vi;
      break;
    }
  }
  if($scope.var122 == null){ //no hay segunda variable
    $scope.v122 = 0;
    $scope.v123 = 0;
    $scope.var122 = "no definido";
    $scope.var123 = "no definido";
  }else{
    for(var i = 1; i < a_pesos.length;i++){
      if($scope.sub1 == a_pesos[i].sn && $scope.mod12 == a_pesos[i].mn && $scope.var121 != a_pesos[i].vn &&$scope.var122 !=a_pesos[i].vn ){
        $scope.var123 = a_pesos[i].vn;
        $scope.v123 = a_pesos[i].vp;
        v123_id = a_pesos[i].vi;
        break;
      }
    }
    if($scope.var123 == null){
      $scope.var123 = "no definido";
      $scope.v123 = 0;
    }
  }
}

if($scope.var121 =="no definido" && $scope.var122 == "no definido" && $scope.var123 == "no definido" ){
  $scope.v121 = 0;
  $scope.v122 = 0;
  $scope.v123 = 0;
}else if($scope.var121 != "no definido" && $scope.var122 == "no definido" && $scope.var123 =="no definido"){
  $scope.v121 = 1;
  $scope.v122 = 0;
  $scope.v123 = 0;
}else if($scope.var121 != "no definido" && $scope.v121 != null && $scope.var122 != "no definido" && $scope.v122 != null && $scope.var123 == "no definido"){
  if($scope.v121 + $scope.v122 != 1){
    $scope.v121 = 0.5;
    $scope.v122 = 0.5;
  }
  $scope.v123 = 0;
}else if($scope.var121 != "no definido" && $scope.var122 != "no definido" && $scope.var123 == "no definido"){
  $scope.v121 = 0.5;
  $scope.v122 = 0.5;
  $scope.v123 = 0;
} else{
  $scope.v121 = 0.3;
  $scope.v122 = 0.3;
  $scope.v123 = 0.3;
}

/*Variables modulo 3*/
for(var i = 1; i <a_pesos.length;i++){
  if(a_pesos[i].sn == $scope.sub1 && a_pesos[i].mn == $scope.mod13){
    $scope.var131 = a_pesos[i].vn;
    $scope.v131 = a_pesos[i].vp;
    v131_id = a_pesos[i].vi;
  }
}
if($scope.var131 == null){ //no hay variables
  $scope.var131 = "no definido";
  $scope.var132 = "no definido";
  $scope.var133 = "no definido";
  $scope.v131 = 0;
  $scope.v132 = 0;
  $scope.v133 = 0;
}else{
  for(var i = 1; i <a_pesos.length;i++){
    if(a_pesos[i].sn == $scope.sub1 && a_pesos[i].mn == $scope.mod13 && a_pesos[i].vn != $scope.var131){
      $scope.var132 = a_pesos[i].vn;
      $scope.v132 = a_pesos[i].vp;
      v132_id = a_pesos[i].vi;
      break; 
    }
  }
  if($scope.var132 == null){ //no hay segunda ni tercer variables
    $scope.var132 = "no definido";
    $scope.var133 = "no definido";
    $scope.v132 = 0;
    $scope.v133 = 0;
  }else{
    for(var i = 1; i <a_pesos.length;i++){
      if(a_pesos[i].sn == $scope.sub1 && a_pesos[i].mn == $scope.mod13 && a_pesos[i].vn != $scope.var131 && a_pesos[i].vn != $scope.var132){
        $scope.var133 = a_pesos[i].vn;
        $scope.v133 = a_pesos[i].vp;
        v133_id = a_pesos[i].vi; 
      }
    }
    if($scope.var133 == null){
      $scope.var133 ="no definido";
      $scope.v133 = 0;
    }
  }
}


if($scope.var131 =="no definido" && $scope.var132 == "no definido" && $scope.var133 == "no definido" ){
  $scope.v131 = 0;
  $scope.v132 = 0;
  $scope.v133 = 0;
}else if($scope.var131 != "no definido" && $scope.var132 == "no definido" && $scope.var133 =="no definido"){
  $scope.v131 = 1;
  $scope.v132 = 0;
  $scope.v133 = 0;
}else if($scope.var131 != "no definido" && $scope.v131 != null && $scope.var132 != "no definido" && $scope.v132 != null && $scope.var133 == "no definido"){
  if($scope.v131 + $scope.v132 != 1){
    $scope.v131 = 0.5;
    $scope.v132 = 0.5;
  }
  $scope.v133 = 0;
}else if($scope.var131 != "no definido" && $scope.var132 != "no definido" && $scope.var133 == "no definido"){
  $scope.v131 = 0.5;
  $scope.v132 = 0.5;
  $scope.v133 = 0;
} else{
  $scope.v131 = 0.3;
  $scope.v132 = 0.3;
  $scope.v133 = 0.3;
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
      }else if($scope.var111 != "no definido" && $scope.var112 == "no definido" &&  $scope.var113 == "no definido"){
        $scope.v111 = 1;
        $scope.v112 = 0;
        $scope.v113 = 0;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }else if($scope.var111 != "no definido" && $scope.var112 != "no definido" && $scope.var113 == "no definido"){
        $scope.v111 = val;
        $scope.v112 = 1 - $scope.v111;
        $scope.v112 = parseFloat(parseFloat($scope.v112).toFixed(1));
        $scope.v113 = 0;
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
      }else if($scope.var111 != "no definido" && $scope.var112 == "no definido" &&  $scope.var113 == "no definido"){
        $scope.v111 = 1;
        $scope.v112 = 0;
        $scope.v113 = 0;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }else if($scope.var111 != "no definido" && $scope.var112 != "no definido" && $scope.var113 == "no definido"){
        $scope.v111 = 1-val;
        $scope.v111 = parseFloat(parseFloat($scope.v111).toFixed(1));
        $scope.v112 = val;
        $scope.v113 = 0;
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
      }else if($scope.var111 != "no definido" && $scope.var112 == "no definido" &&  $scope.var113 == "no definido"){
        $scope.v111 = 1;
        $scope.v112 = 0;
        $scope.v113 = 0;
        angular.element("#slider7").slider('setValue',$scope.v111);
        angular.element("#slider8").slider('setValue',$scope.v112);
        angular.element("#slider9").slider('setValue',$scope.v113);
      }else{
        $scope.v113 = 0;
        angular.element("#slider9").slider('setValue',$scope.v113);
      }
     });
  }

  /*Variable 1 modulo2 subsistema 1*/
  var updateModel10 = function(val){
    $scope.$apply(function(){
      if($scope.var121 == "no definido" && $scope.var122 == "no definido" && $scope.var123 == "no definido"){
        $scope.v121 = 0;
        $scope.v122 = 0;
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      } else if($scope.var121 != "no definido" &&  $scope.var122 != "no definido" && $scope.var123 !="no definido"){
        $scope.v121 = 0.3;
        $scope.v122 = 0.3;
        $scope.v123 = 0.3;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }else if($scope.var121 != "no definido" && $scope.var122 == "no definido" &&  $scope.var123 == "no definido"){
        $scope.v121 = 1;
        $scope.v122 = 0;
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }else if($scope.var121 != "no definido" && $scope.var122 != "no definido" && $scope.var123 == "no definido"){
        $scope.v122 = 1-val;
        $scope.v122 = parseFloat(parseFloat($scope.v122).toFixed(1));
        $scope.v121 = val;
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }
    });
  }

  /*Variable 2 modulo2 subsistema1 */
  var updateModel11 = function(val){
    $scope.$apply(function(){
      if($scope.var121 == "no definido" && $scope.var122 == "no definido" && $scope.var123 == "no definido"){
        $scope.v121 = 0;
        $scope.v122 = 0;
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      } else if($scope.var121 != "no definido" &&  $scope.var122 != "no definido" && $scope.var123 !="no definido"){
        $scope.v121 = 0.3;
        $scope.v122 = 0.3;
        $scope.v123 = 0.3;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }else if($scope.var121 != "no definido" && $scope.var122 == "no definido" &&  $scope.var123 == "no definido"){
        $scope.v121 = 1;
        $scope.v122 = 0;
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }else if($scope.var121 != "no definido" && $scope.var122 != "no definido" && $scope.var123 == "no definido"){
        $scope.v122 = val;
        $scope.v121 = 1-$scope.v122;
        $scope.v121 = parseFloat(parseFloat($scope.v121).toFixed(1));
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }
    });
  }

  /*Variable 3 modulo2 subsistema1*/
  var updateModel12 = function(val){
    $scope.$apply(function(){
      if($scope.var121 == "no definido" && $scope.var122 == "no definido" && $scope.var123 == "no definido"){
        $scope.v121 = 0;
        $scope.v122 = 0;
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      } else if($scope.var121 != "no definido" &&  $scope.var122 != "no definido" && $scope.var123 !="no definido"){
        $scope.v121 = 0.3;
        $scope.v122 = 0.3;
        $scope.v123 = 0.3;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }else if($scope.var121 != "no definido" && $scope.var122 == "no definido" &&  $scope.var123 == "no definido"){
        $scope.v121 = 1;
        $scope.v122 = 0;
        $scope.v123 = 0;
        angular.element("#slider10").slider('setValue',$scope.v121);
        angular.element("#slider11").slider('setValue',$scope.v122);
        angular.element("#slider12").slider('setValue',$scope.v123);
      }else{
        $scope.v123= 0;
        angular.element("#slider12").slider('setValue',$scope.v123);
      }
    });
  }

  var updateModel13 = function(val){
    $scope.$apply(function(){
      if($scope.var131 == "no definido" && $scope.var132 == "no definido" && $scope.var133 == "no definido"){
        $scope.v131 = 0;
        $scope.v132 = 0;
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" &&  $scope.var132 != "no definido" && $scope.var133 !="no definido"){
        $scope.v131 = 0.3;
        $scope.v132 = 0.3;
        $scope.v133 = 0.3;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" && $scope.var132 == "no definido" &&  $scope.var133 == "no definido"){
        $scope.v131 = 1;
        $scope.v132 = 0;
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" && $scope.var132 != "no definido" &&  $scope.var133 == "no definido"){
        $scope.v131 = val;
        $scope.v132 = 1-$scope.v131;
        $scope.v132 = parseFloat(parseFloat($scope.v132).toFixed(1));
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }
    });
  }

  var updateModel14 = function(val){
    $scope.$apply(function(){
      if($scope.var131 == "no definido" && $scope.var132 == "no definido" && $scope.var133 == "no definido"){
        $scope.v131 = 0;
        $scope.v132 = 0;
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" &&  $scope.var132 != "no definido" && $scope.var133 !="no definido"){
        $scope.v131 = 0.3;
        $scope.v132 = 0.3;
        $scope.v133 = 0.3;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" && $scope.var132 == "no definido" &&  $scope.var133 == "no definido"){
        $scope.v131 = 1;
        $scope.v132 = 0;
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" && $scope.var132 != "no definido" &&  $scope.var133 == "no definido"){
        $scope.v132 = val;
        $scope.v131 = 1-$scope.v132;
        $scope.v131 = parseFloat(parseFloat($scope.v131).toFixed(1));
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }
    });
  }

  var updateModel15 = function(val){
    $scope.$apply(function(){
      if($scope.var131 == "no definido" && $scope.var132 == "no definido" && $scope.var133 == "no definido"){
        $scope.v131 = 0;
        $scope.v132 = 0;
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" &&  $scope.var132 != "no definido" && $scope.var133 !="no definido"){
        $scope.v131 = 0.3;
        $scope.v132 = 0.3;
        $scope.v133 = 0.3;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else if($scope.var131 != "no definido" && $scope.var132 == "no definido" &&  $scope.var133 == "no definido"){
        $scope.v131 = 1;
        $scope.v132 = 0;
        $scope.v133 = 0;
        angular.element("#slider13").slider('setValue',$scope.v131);
        angular.element("#slider14").slider('setValue',$scope.v132);
        angular.element("#slider15").slider('setValue',$scope.v133);
      }else{
        $scope.v133 = 0;        
        angular.element("#slider15").slider('setValue',$scope.v133);
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

  angular.element("#slider10").on('slideStop', function(data){
    updateModel10(data.value);
  });

  angular.element("#slider11").on('slideStop', function(data){
    updateModel11(data.value);
  });

  angular.element("#slider12").on('slideStop', function(data){
    updateModel12(data.value);
  });

  angular.element("#slider13").on('slideStop', function(data){
    updateModel13(data.value);
  });

  angular.element("#slider14").on('slideStop', function(data){
    updateModel14(data.value);
  });

  angular.element("#slider15").on('slideStop', function(data){
    updateModel15(data.value);
  });


  $scope.addPesos = function() {
    console.log("SCOPPEEEEEEEEEEE", $scope);
     $http.put('/api/pesos/'+idproyecto, {id_proyecto: idproyecto,sub1_id:s1_id,sub1_peso:$scope.s1,sub2_id:s2_id,sub2_peso:$scope.s2,sub3_id:s3_id,sub3_peso:$scope.s3,mod11_id:m11_id,mod11_peso:$scope.m11,mod12_id:m12_id,mod12_peso:$scope.m12,mod13_id:m13_id, mod13_peso:$scope.m13,var111_id: v111_id,var111_peso: $scope.v111,var112_id:v112_id,var112_peso:$scope.v112,var113_id:v113_id,var113_peso:$scope.v113,var121_id:v121_id,var121_peso: $scope.v121,var122_id:v122_id,var122_peso: $scope.v122, var123_id:v123_id,var123_peso: $scope.v123}).success(function(data, status) {      
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