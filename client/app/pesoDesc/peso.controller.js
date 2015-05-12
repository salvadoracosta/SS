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

  /*Modulos subsistema 2 */
  var m21_id;
  var m22_id;
  var m23_id;

  /* Variables subsistema 2 modulo 1 */
  var v211_id;
  var v212_id; 
  var v213_id;

  /* Variables subsistema 2 modulo 2*/
  var v221_id;
  var v222_id;
  var v223_id;

  /* Variables subsistema 2 modulo 2*/
  var v231_id;
  var v232_id;
  var v233_id;

  /* modulos subsistema 3*/
  var m31_id;
  var m32_id;
  var m33_id;

  /* Variables subsistema 3 modulo 1 */
  var v311_id;
  var v312_id; 
  var v313_id;

  /* Variables subsistema 3 modulo 2 */
  var v321_id;
  var v322_id; 
  var v323_id;

  /* Variables subsistema 3 modulo 3 */
  var v331_id;
  var v332_id; 
  var v333_id;


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
  }else if($scope.sub1 != "no definido" && $scope.s1 != null &&$scope.sub2 != "no definido" && $scope.s2 != null && $scope.sub3 != "no definido" && $scope.s3 !=null){
    if($scope.s1 + $scope.s2 + $scope.s3 < 0.9 || $scope.s1 + $scope.s2 + $scope.s3 > 1  ){
      $scope.s1 = 0.3;
      $scope.s2 = 0.3;
      $scope.s3 = 0.3;
    }
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

if($scope.mod11 !="no definido" && $scope.m11 != null && $scope.mod12 != "no definido" && $scope.m12 != null && $scope.mod13 != "no definido" && $scope.m13 != null){
  if($scope.m11 + $scope.m12 + $scope.m13 < 0.9 || $scope.m11 + $scope.m12 + $scope.m13 > 1){
    $scope.m11 = 0.3;
    $scope.m12 = 0.3;
    $scope.m13 = 0.3;
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
} else if($scope.var111 != "no definido" && $scope.v111 != null && $scope.var112 != "no definido" && $scope.v112  != null && $scope.var113 != "no definido" && $scope.v113 != null){
  if($scope.v111 + $scope.v112 + $scope.v113 < 0.9  || $scope.v111 + $scope.v112 + $scope.v113 >1){
    $scope.v111 = 0.3;
    $scope.v112 = 0.3;
    $scope.v113 = 0.3;
  }
}else{
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
}else if($scope.var121 != "no definido" && $scope.v121 != null && $scope.var122 != "no definido" && $scope.v122 != null && $scope.var123 != "no definido" && $scope.v123 != null){
  if ($scope.v121 + $scope.v122 + $scope.v123 < 0.9 || $scope.v121 + $scope.v122 + $scope.v123 >1){
    $scope.v121 = 0.3;
    $scope.v122 = 0.3;
    $scope.v123 = 0.3; 
  }
}else{
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
}else if($scope.var131 != "no definido" && $scope.v131 != null && $scope.var132 != "no definido"  && $scope.v132 != null && $scope.var133 != "no definido" && $scope.v133 != null){
  if($scope.v131+ $scope.v132 + $scope.v133 < 0.9 || $scope.v131+ $scope.v132 + $scope.v133 >1 ){
    $scope.v131 = 0.3;
    $scope.v132 = 0.3;
    $scope.v133 = 0.3;
  }
} else{
  $scope.v131 = 0.3;
  $scope.v132 = 0.3;
  $scope.v133 = 0.3;
}


/*Modulos subsistema 2*/
for(var i = 1; i <a_pesos.length;i++){
  if($scope.sub2 == a_pesos[i].sn){
    $scope.mod21 = a_pesos[i].mn;
    $scope.m21 = a_pesos[i].mp;
    m21_id = a_pesos[i].mi;
    break;
  }
}
if($scope.mod21 == null){ //no hay modulos
  $scope.mod21 = "no definido";
  $scope.mod22 = "no definido";
  $scope.mod23 = "no definido";
  $scope.m21 = 0;
  $scope.m22 = 0;
  $scope.m23 = 0;
} else {
  for(var i = 1; i <a_pesos.length;i++){
    if($scope.sub2 == a_pesos[i].sn && $scope.mod21 != a_pesos[i].mn){
      $scope.mod22 = a_pesos[i].mn;
      $scope.m22 = a_pesos[i].mp;
      m22_id = a_pesos[i].mi;
      break;
    }
  }
  if($scope.mod22 == null){
    $scope.mod22 ="no definido";
    $scope.mod23 = "no definido";
    $scope.m22 = 0;
    $scope.m23 = 0;
  }else{
    for(var i = 1; i <a_pesos.length;i++){
      if($scope.sub2 == a_pesos[i].sn && $scope.mod21 != a_pesos[i].mn && $scope.mod22 != a_pesos[i].mn){
        $scope.mod23 = a_pesos[i].mn;
        $scope.m23 = a_pesos[i].mp;
        m23_id = a_pesos[i].mi;
        break;
      }
    }
    if($scope.mod23 == null){
      $scope.mod23 = "no definido";
      $scope.m23 = 0;
    }
  }
}

if($scope.mod21 !="no definido" && $scope.m21 != null && $scope.mod22 != "no definido" && $scope.m22 != null && $scope.mod23 != "no definido" && $scope.m23 != null){
  if($scope.m21 + $scope.m22 + $scope.m23 < 0.9 || $scope.m21 + $scope.m22 + $scope.m23 >1 ){ 
    $scope.m21 = 0.3;
    $scope.m22 = 0.3;
    $scope.m23 = 0.3;
  }
}else if($scope.mod21 !="no definido" && $scope.mod22 != "no definido" && $scope.mod23 != "no definido"){
  $scope.m21 = 0.3;
  $scope.m22 = 0.3;
  $scope.m23 = 0.3; 
}else if($scope.mod21 !="no definido" && $scope.mod22 == "no definido" && $scope.mod23 == "no definido"){
  $scope.m21 = 1;
  $scope.m22 = 0;
  $scope.m23 = 0;
}else if($scope.mod21 != "no definido" && $scope.m21 != null && $scope.mod22 != "no definido" && $scope.m22 !=null && $scope.mod23 =="no definido"){
  if($scope.m21 + $scope.m22 !=1){
    $scope.m21 = 0.5;
    $scope.m22 = 0.5;
  }
  $scope.m23 = 0;
}else if($scope.mod21 != "no definido" && $scope.mod22 != "no definido" && $scope.mod23 =="no definido"){
  $scope.m21 = 0.5;
  $scope.m22 = 0.5;
  $scope.m23 = 0;
}

/*Variables modulo 1 subsistema 2*/
for (var i = 1; i <a_pesos.length;i++){
  if(a_pesos[i].mn == $scope.mod21){
    $scope.var211 = a_pesos[i].vn;
    $scope.v211 = a_pesos[i].vp;
    v211_id = a_pesos[i].vi;
    break;
  }
}
if($scope.var211 == null){
  $scope.var211 = "no definido";
  $scope.var212 = "no definido";
  $scope.var213 = "no definido";
  $scope.v211 = 0;
  $scope.v212 = 0;
  $scope.v213 = 0;
} else{
  for (var i = 1; i < a_pesos.length;i++){
    if(a_pesos[i].mn == $scope.mod21 && a_pesos[i].vn != $scope.var211){
      $scope.var212 = a_pesos[i].vn;
      $scope.v212 = a_pesos[i].vp;
      v212_id = a_pesos[i].vi;
      break; 
    }
  }
  if($scope.var212==null){
    $scope.var212 = "no definido";
    $scope.var213 = "no definido";
    $scope.v212 = 0;
    $scope.v213 = 0;
  }else{
    for (var i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn == $scope.mod21 && a_pesos[i].vn != $scope.var211 && a_pesos[i].vn != $scope.var212){
        $scope.var213 = a_pesos[i].vn;
        $scope.v213 = a_pesos[i].vp;
        v213_id = a_pesos[i].vi;
      }
    }
    if($scope.var213 ==null){
      $scope.var213 = "no definido";
      $scope.v213 = 0;
    }      
  }
}
if($scope.var211 == "no definido" && $scope.var212 == "no definido" && $scope.var213 == "no definido"){
  $scope.v211 = 0;
  $scope.v212 = 0;
  $scope.v213 = 0;
}else if($scope.var211 != "no definido" && $scope.var212 == "no definido" && $scope.var213 == "no definido"){
  $scope.v211 = 1;
  $scope.v212 = 0;
  $scope.v213 = 0;
}else if($scope.var211 != "no definido" && $scope.v211 == null && $scope.var212 != "no definido" && $scope.v212 == null && $scope.var213 == "no definido"){
  $scope.v211 = 0.5;
  $scope.v212 = 0.5;
  $scope.v213 = 0;
}else if($scope.var211 != "no definido" && $scope.var212 != "no definido" && $scope.var213 != "no definido" && $scope.v211 == null  && $scope.v212 == null && $scope.v213 == null){
  $scope.v211 = 0.3;
  $scope.v212 = 0.3;
  $scope.v213 = 0.3;
}else if($scope.var211 != "no definido" && $scope.var212 != "no definido" && $scope.var213 != "no definido"){
  if($scope.v211 + $scope.v212 + $scope.v213 <0.9 || $scope.v211 + $scope.v212 + $scope.v213 >1 ){
    $scope.v211 = 0.3;
    $scope.v212 = 0.3;
    $scope.v213 = 0.3;
  }
}

/*Variables modulo 2 subsistema 2*/
for(var i = 0; i <a_pesos.length;i++){
  if(a_pesos[i].mn == $scope.mod22 && a_pesos[i].sn == $scope.sub2){
    $scope.var221 = a_pesos[i].vn;
    $scope.v221 = a_pesos[i].vp;
    v221_id = a_pesos[i].vi;
    break;
  }
}
if($scope.var221 == null){
  $scope.var221 = "no definido";
  $scope.var222 = "no definido";
  $scope.var223 = "no definido";
  $scope.v221 = 0;
  $scope.v223 = 0;
  $scope.v222 = 0;
}else{
  for(var i = 1; i <a_pesos.length;i++){
    if(a_pesos[i].mn == $scope.mod22 && a_pesos[i].sn == $scope.sub2 && a_pesos[i].vn != $scope.var221){
      $scope.var222 = a_pesos[i].vn;
      $scope.v222 = a_pesos[i].vp;
      v222_id = a_pesos[i].vi;
    }
  }
  if($scope.var222 == null){
    $scope.var222 = "no definido";
    $scope.var223 = "no definido";
    $scope.v222 = 0;
    $scope.v223 = 0;
  }else{
    for(var i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn == $scope.mod22 && a_pesos[i].sn == $scope.sub2 && a_pesos[i].vn != $scope.var221 && a_pesos[i].vn != $scope.var222){
        $scope.var223 = a_pesos[i].vn;
        $scope.v223 = a_pesos[i].vp;
        v223_id = a_pesos[i].vi;
        break;
      }
    }
    if($scope.var223 == null){
      $scope.var223 ="no definido";
      $scope.v223 = 0;
    }
  }
}

if($scope.var221 == "no definido" && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
  $scope.v221 = 0;
  $scope.v222 = 0;
  $scope.v223 = 0;
}else if($scope.var221 != "no definido" && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
  $scope.v221 = 1;
  $scope.v222 = 0;
  $scope.v223 = 0;
}else if($scope.var221 != "no definido" && $scope.v221 == null && $scope.var222 != "no definido"  && $scope.v222 == null && $scope.var223 == "no definido"){
  $scope.v221 = 0.5;
  $scope.v222 = 0.5;
  $scope.v223 = 0;
}else if($scope.var221 != "no definido" && $scope.var222 != "no definido" && $scope.var223 == "no definido"){
  if($scope.v221 + $scope.v222 != 1){
  $scope.v221 = 0.5;
  $scope.v222 = 0.5;
  }
  $scope.v223 = 0;
}else if($scope.var221 != "no definido" && $scope.v221 != null && $scope.var222 != "no definido" && $scope.v222 != null && $scope.var223 != "no definido" && $scope.v223 != null){
  if($scope.v221 + $scope.v222 + $scope.v223 < 0.9 || $scope.v221 + $scope.v222 + $scope.v223 >1 ){
    $scope.v221 = 0.3;
    $scope.v222 = 0.3;
    $scope.v223 = 0.3;
  }
}else if($scope.var221 != "no definido" && $scope.var222 != "no definido" && $scope.var223 != "no definido"){
  $scope.v221 = 0.3;
  $scope.v222 = 0.3;
  $scope.v223 = 0.3;
}



/* variables modulo 3 subsistema 2*/
for(var i = 0; i <a_pesos.length;i++){
  if(a_pesos[i].mn == $scope.mod23 && a_pesos[i].sn == $scope.sub2){
    $scope.var231 = a_pesos[i].vn;
    $scope.v231 = a_pesos[i].vp;
    v231_id = a_pesos[i].vi;
    break;
  }
}
if($scope.var231 == null){
  $scope.var231 = "no definido";
  $scope.var232 = "no definido";
  $scope.var233 = "no definido";
  $scope.v231 = 0;
  $scope.v233 = 0;
  $scope.v232 = 0;
}else{
  for(var i = 1; i <a_pesos.length;i++){
    if(a_pesos[i].mn == $scope.mod23 && a_pesos[i].sn == $scope.sub2 && a_pesos[i].vn != $scope.var231){
      $scope.var232 = a_pesos[i].vn;
      $scope.v232 = a_pesos[i].vp;
      v232_id = a_pesos[i].vi;
    }
  }
  if($scope.var232 == null){
    $scope.var232 = "no definido";
    $scope.var233 = "no definido";
    $scope.v232 = 0;
    $scope.v233 = 0;
  }else{
    for(var i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn == $scope.mod23 && a_pesos[i].sn == $scope.sub2 && a_pesos[i].vn != $scope.var231 && a_pesos[i].vn != $scope.var232){
        $scope.var233 = a_pesos[i].vn;
        $scope.v233 = a_pesos[i].vp;
        v233_id = a_pesos[i].vi;
        break;
      }
    }
    if($scope.var233 == null){
      $scope.var233 ="no definido";
      $scope.v233 = 0;
    }
  }
}

if($scope.var231 == "no definido" && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
  $scope.v231 = 0;
  $scope.v232 = 0;
  $scope.v233 = 0;
}else if($scope.var231 != "no definido" && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
  $scope.v231 = 1;
  $scope.v232 = 0;
  $scope.v233 = 0;
}else if($scope.var231 != "no definido" && $scope.v231 != null && $scope.var232 != "no definido"  && $scope.v232 != null && $scope.var233 == "no definido"){
  if($scope.v231 + $scope.v232 != 1){
    $scope.v231 = 0.5;
    $scope.v232 = 0.5;
  }
  $scope.v233 = 0;
}else if($scope.var231 != "no definido" && $scope.var232 != "no definido" && $scope.var233 == "no definido"){
  $scope.v231 = 0.5;
  $scope.v232 = 0.5;
  $scope.v233 = 0;
}else if($scope.var231 != "no definido" && $scope.var232 != "no definido" && $scope.var233 != "no definido" && $scope.v231 != null && $scope.v232 != null && $scope.v233 != null){
  if($scope.v231 + $scope.v232 + $scope.v233 <0.9 || $scope.v231 + $scope.v232 + $scope.v233 >1 ){
  $scope.v231 = 0.3;
  $scope.v232 = 0.3;
  $scope.v233 = 0.3;  
  }
}else if($scope.var231 != "no definido" && $scope.var232 != "no definido" && $scope.var233 != "no definido"){
  $scope.v231 = 0.3;
  $scope.v232 = 0.3;
  $scope.v233 = 0.3;
}


/*Modulos subsistema 3*/
for(var i = 1; i <a_pesos.length;i++){
  if($scope.sub3 == a_pesos[i].sn){
    $scope.mod31 = a_pesos[i].mn;
    $scope.m31 = a_pesos[i].mp;
    m31_id = a_pesos[i].mi;
    break;
  }
}
if($scope.mod31 == null){ //no hay modulos
  $scope.mod31 = "no definido";
  $scope.mod32 = "no definido";
  $scope.mod33 = "no definido";
  $scope.m31 = 0;
  $scope.m32 = 0;
  $scope.m33 = 0;
} else {
  for(var i = 1; i <a_pesos.length;i++){
    if($scope.sub3 == a_pesos[i].sn && $scope.mod31 != a_pesos[i].mn){
      $scope.mod32 = a_pesos[i].mn;
      $scope.m32 = a_pesos[i].mp;
      m32_id = a_pesos[i].mi;
      break;
    }
  }
  if($scope.mod32 == null){
    $scope.mod32 ="no definido";
    $scope.mod33 = "no definido";
    $scope.m32 = 0;
    $scope.m33 = 0;
  }else{
    for(var i = 1; i <a_pesos.length;i++){
      if($scope.sub3 == a_pesos[i].sn && $scope.mod31 != a_pesos[i].mn && $scope.mod32 != a_pesos[i].mn){
        $scope.mod33 = a_pesos[i].mn;
        $scope.m33 = a_pesos[i].mp;
        m33_id = a_pesos[i].mi;
        break;
      }
    }
    if($scope.mod33 == null){
      $scope.mod33 = "no definido";
      $scope.m33 = 0;
    }
  }
}


if($scope.mod31 =="no definido" && $scope.mod32 == "no definido" && $scope.mod33 == "no definido"){
  $scope.m31 = 0;
  $scope.m32 = 0;
  $scope.m33 = 0; 
}else if($scope.mod31 !="no definido" && $scope.m31  != null && $scope.mod32 != "no definido" && $scope.m32 != null && $scope.mod33 != "no definido" && $scope.m33 != null){
  if($scope.m31 + $scope.m32 + $scope.m33 < 0.9 || $scope.m31 + $scope.m32 + $scope.m33 >1){
    $scope.m31 = 0.3;
    $scope.m32 = 0.3;
    $scope.m33 = 0.3;
  }
}else if($scope.mod31 !="no definido" && $scope.mod32 != "no definido" && $scope.mod33 != "no definido"){
  $scope.m31 = 0.3;
  $scope.m32 = 0.3;
  $scope.m33 = 0.3; 
}else if($scope.mod31 !="no definido" && $scope.mod32 == "no definido" && $scope.mod33 == "no definido"){
  $scope.m31 = 1;
  $scope.m32 = 0;
  $scope.m33 = 0;
}else if($scope.mod31 != "no definido" && $scope.m31 != null && $scope.mod32 != "no definido" && $scope.m32 !=null && $scope.mod33 =="no definido"){
  if($scope.m31 + $scope.m32 !=1){
    $scope.m31 = 0.5;
    $scope.m32 = 0.5;
  }
  $scope.m33 = 0;
}else if($scope.mod31 != "no definido" && $scope.mod32 != "no definido" && $scope.mod33 =="no definido"){
  $scope.m31 = 0.5;
  $scope.m32 = 0.5;
  $scope.m33 = 0;
}


/* Variables modulo1 subsistema 3*/
for (var i = 1; i <a_pesos.length;i++){
  if(a_pesos[i].mn == $scope.mod31){
    $scope.var311 = a_pesos[i].vn;
    $scope.v311 = a_pesos[i].vp;
    v311_id = a_pesos[i].vi;
    break;
  }
}
if($scope.var311 == null){
  $scope.var311 = "no definido";
  $scope.var312 = "no definido";
  $scope.var313 = "no definido";
  $scope.v311 = 0;
  $scope.v312 = 0;
  $scope.v313 = 0;
} else{
  for (var i = 1; i < a_pesos.length;i++){
    if(a_pesos[i].mn == $scope.mod31 && a_pesos[i].vn != $scope.var311){
      $scope.var312 = a_pesos[i].vn;
      $scope.v312 = a_pesos[i].vp;
      v312_id = a_pesos[i].vi;
      break; 
    }
  }
  if($scope.var312==null){
    $scope.var312 = "no definido";
    $scope.var313 = "no definido";
    $scope.v312 = 0;
    $scope.v313 = 0;
  }else{
    for (var i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn == $scope.mod31 && a_pesos[i].vn != $scope.var311 && a_pesos[i].vn != $scope.var312){
        $scope.var313 = a_pesos[i].vn;
        $scope.v313 = a_pesos[i].vp;
        v313_id = a_pesos[i].vi;
      }
    }
    if($scope.var313 ==null){
      $scope.var313 = "no definido";
      $scope.v313 = 0;
    }      
  }
}
if($scope.var311 == "no definido" && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
  $scope.v311 = 0;
  $scope.v312 = 0;
  $scope.v313 = 0;
}else if($scope.var311 != "no definido" && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
  $scope.v311 = 1;
  $scope.v312 = 0;
  $scope.v313 = 0;
}else if($scope.var311 != "no definido" && $scope.v311 == null && $scope.var312 != "no definido" && $scope.v312 == null && $scope.var313 == "no definido"){
  $scope.v311 = 0.5;
  $scope.v312 = 0.5;
  $scope.v313 = 0;
}else if($scope.var311 != "no definido" && $scope.var312 != "no definido" && $scope.var313 != "no definido" && $scope.v311 == null  && $scope.v312 == null && $scope.v313 == null){
  $scope.v311 = 0.3;
  $scope.v312 = 0.3;
  $scope.v313 = 0.3;
}else if($scope.var311 != "no definido" && $scope.var312 != "no definido" && $scope.var313 != "no definido"){
  if($scope.v311 + $scope.v312 + $scope.v313< 0.9 || $scope.v311 + $scope.v312 + $scope.v313 >1){
    $scope.v311 = 0.3;
    $scope.v312 = 0.3;
    $scope.v313 = 0.3;
  }
}



/* Variables modulo2 subsistema 3*/
for (var i = 1; i <a_pesos.length;i++){
  if(a_pesos[i].mn == $scope.mod32){
    $scope.var321 = a_pesos[i].vn;
    $scope.v321 = a_pesos[i].vp;
    v321_id = a_pesos[i].vi;
    break;
  }
}
if($scope.var321 == null){
  $scope.var321 = "no definido";
  $scope.var322 = "no definido";
  $scope.var323 = "no definido";
  $scope.v321 = 0;
  $scope.v322 = 0;
  $scope.v323 = 0;
} else{
  for (var i = 1; i < a_pesos.length;i++){
    if(a_pesos[i].mn == $scope.mod32 && a_pesos[i].vn != $scope.var321){
      $scope.var322 = a_pesos[i].vn;
      $scope.v322 = a_pesos[i].vp;
      v322_id = a_pesos[i].vi;
      break; 
    }
  }
  if($scope.var322==null){
    $scope.var322 = "no definido";
    $scope.var323 = "no definido";
    $scope.v322 = 0;
    $scope.v323 = 0;
  }else{
    for (var i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn == $scope.mod32 && a_pesos[i].vn != $scope.var321 && a_pesos[i].vn != $scope.var322){
        $scope.var323 = a_pesos[i].vn;
        $scope.v323 = a_pesos[i].vp;
        v323_id = a_pesos[i].vi;
      }
    }
    if($scope.var323 ==null){
      $scope.var323 = "no definido";
      $scope.v323 = 0;
    }      
  }
}
if($scope.var321 == "no definido" && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
  $scope.v321 = 0;
  $scope.v322 = 0;
  $scope.v323 = 0;
}else if($scope.var321 != "no definido" && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
  $scope.v321 = 1;
  $scope.v322 = 0;
  $scope.v323 = 0;
}else if($scope.var321 != "no definido" && $scope.v321 == null && $scope.var322 != "no definido" && $scope.v322 == null && $scope.var323 == "no definido"){
  $scope.v321 = 0.5;
  $scope.v322 = 0.5;
  $scope.v323 = 0;
}else if($scope.var321 != "no definido" && $scope.var322 != "no definido" && $scope.var323 != "no definido" && $scope.v321 == null  && $scope.v322 == null && $scope.v323 == null){
  $scope.v321 = 0.3;
  $scope.v322 = 0.3;
  $scope.v323 = 0.3;
}else if($scope.var321 != "no definido" && $scope.v321 != null && $scope.var322 != "no definido" && $scope.v322 != null && $scope.var323 != "no definido" && $scope.v323 != null){
  if($scope.v321 + $scope.v322 + $scope.v323 <0.9 ||$scope.v321 + $scope.v322 + $scope.v323 >1){
    $scope.v321 = 0.3;
    $scope.v322 = 0.3;
    $scope.v323 = 0.3;
  }
}

/* Variables modulo3 subsistema 3*/
for (var i = 1; i <a_pesos.length;i++){
  if(a_pesos[i].mn == $scope.mod33){
    $scope.var331 = a_pesos[i].vn;
    $scope.v331 = a_pesos[i].vp;
    v331_id = a_pesos[i].vi;
    break;
  }
}
if($scope.var331 == null){
  $scope.var331 = "no definido";
  $scope.var332 = "no definido";
  $scope.var333 = "no definido";
  $scope.v331 = 0;
  $scope.v332 = 0;
  $scope.v333 = 0;
} else{
  for (var i = 1; i < a_pesos.length;i++){
    if(a_pesos[i].mn == $scope.mod33 && a_pesos[i].vn != $scope.var331){
      $scope.var332 = a_pesos[i].vn;
      $scope.v332 = a_pesos[i].vp;
      v332_id = a_pesos[i].vi;
      break; 
    }
  }
  if($scope.var332==null){
    $scope.var332 = "no definido";
    $scope.var333 = "no definido";
    $scope.v332 = 0;
    $scope.v333 = 0;
  }else{
    for (var i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn == $scope.mod33 && a_pesos[i].vn != $scope.var331 && a_pesos[i].vn != $scope.var332){
        $scope.var333 = a_pesos[i].vn;
        $scope.v333 = a_pesos[i].vp;
        v333_id = a_pesos[i].vi;
      }
    }
    if($scope.var333 ==null){
      $scope.var333 = "no definido";
      $scope.v333 = 0;
    }      
  }
}
if($scope.var331 == "no definido" && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
  $scope.v331 = 0;
  $scope.v332 = 0;
  $scope.v333 = 0;
}else if($scope.var331 != "no definido" && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
  $scope.v331 = 1;
  $scope.v332 = 0;
  $scope.v333 = 0;
}else if($scope.var331 != "no definido" && $scope.v331 == null && $scope.var332 != "no definido" && $scope.v332 == null && $scope.var333 == "no definido"){
  $scope.v331 = 0.5;
  $scope.v332 = 0.5;
  $scope.v333 = 0;
}else if($scope.var331 != "no definido" && $scope.var332 != "no definido" && $scope.var333 != "no definido" && $scope.v331 == null  && $scope.v332 == null && $scope.v333 == null){
  $scope.v331 = 0.3;
  $scope.v332 = 0.3;
  $scope.v333 = 0.3;
}else if($scope.var331 != "no definido" && $scope.v331 != null && $scope.var332 != "no definido" && $scope.v332 != null && $scope.var333 != "no definido" && $scope.v333 != null){
  if($scope.v331 + $scope.v332 + $scope.v333 <0.9 || $scope.v331 + $scope.v332 + $scope.v333 >1){
    $scope.v331 = 0.3;
    $scope.v332 = 0.3;
    $scope.v333 = 0.3;
  }
}else{
  $scope.v331 = 0.3;
  $scope.v332 = 0.3;
  $scope.v333 = 0.3;
}











  var updateModel = function(val){
    $scope.$apply(function(){
      if($scope.sub1 !="no definido" && $scope.sub2 !="no definido" && $scope.sub3!= "no definido"){
        $scope.s1 = val;
        if($scope.s1 + $scope.s2 <1){
          $scope.s3 = 1-$scope.s1 - $scope.s2;
          $scope.s3 = parseFloat(parseFloat($scope.s3).toFixed(1));
        }else if($scope.s1 + $scope.s2 > 1){
          $scope.s2 = 1 - $scope.s1;
          $scope.s2 = parseFloat(parseFloat($scope.s2).toFixed(1));
          $scope.s3 = 0;
        }else if($scope.s1 + $scope.s2 ==  1){
          $scope.s3 = 0;
        }
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
        
        $scope.s2 = val;
        if($scope.s1 + $scope.s2 < 1){
          $scope.s3 = 1 - $scope.s1 - $scope.s2;
          $scope.s3 = parseFloat(parseFloat($scope.s3).toFixed(1));
        }else if($scope.s1 + $scope.s2 >1){
          $scope.s1 = 1 - $scope.s2;
          $scope.s1 = parseFloat(parseFloat($scope.s1).toFixed(1));
          $scope.s3 = 0;
        } else if($scope.s1+$scope.s2 == 1){
          $scope.s3 = 0;
        } 
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
        $scope.s3 = 1- $scope.s1 - $scope.s2 ;
        $scope.s3 = parseFloat(parseFloat($scope.s3).toFixed(1));
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
        $scope.m11 = val;
        if($scope.m11 + $scope.m12 == 1){
          $scope.m13 = 0;
        }else if($scope.m11 + $scope.m12 >1){
          $scope.m12 = 1- $scope.m11;
          $scope.m12 = parseFloat(parseFloat($scope.m12).toFixed(1));
          $scope.m13 = 0;
        }else if($scope.m11 + $scope.m12 <1){
          $scope.m13 = 1- $scope.m11 -$scope.m12;
          $scope.m13 = parseFloat(parseFloat($scope.m13).toFixed(1));
        }
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
        $scope.m12 = val;
        if($scope.m11 + $scope.m12 == 1){
          $scope.m13 = 0;
        }else if($scope.m11 + $scope.m12 > 1){
          $scope.m11 = 1- $scope.m12 ;
          $scope.m11 = parseFloat(parseFloat($scope.m11).toFixed(1));
          $scope.m13 = 0;
        }else if($scope.m11 + $scope.m12 <1 ){
          $scope.m13 = 1 - $scope.m11 - $scope.m12;
          $scope.m13 = parseFloat(parseFloat($scope.m13).toFixed(1));
        }

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
        $scope.m13 = 1 - $scope.m11 - $scope.m12;
        $scope.m13 = parseFloat(parseFloat($scope.m13).toFixed(1));
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
        $scope.v111 = val;
        if($scope.v111 + $scope.v112 == 1){
          $scope.v113 = 0;
        }else if($scope.v111 + $scope.v112 < 1){  
          $scope.v113 = 1 - $scope.v111 - $scope.v112;
          $scope.v113 = parseFloat(parseFloat($scope.v113).toFixed(1));
        }else if($scope.v111 + $scope.v112 < 1){
          $scope.v112 = 1 - $scope.v111;
          $scope.v112 = parseFloat(parseFloat($scope.v112).toFixed(1));
          $scope.v113 = 0;
        }
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
        $scope.v112 = val;
        if($scope.v111 + $scope.v112 == 1){
          $scope.v113 = 0;
        }else if($scope.v111 + $scope.v112 < 1){  
          $scope.v113 = 1 - $scope.v111 - $scope.v112;
          $scope.v113 = parseFloat(parseFloat($scope.v113).toFixed(1));
        }else if($scope.v111 + $scope.v112 < 1){
          $scope.v111 = 1 - $scope.v112;
          $scope.v111 = parseFloat(parseFloat($scope.v111).toFixed(1));
          $scope.v113 = 0;
        }
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
        $scope.v113 = 1 - $scope.v111 - $scope.v112;
        $scope.v113 = parseFloat(parseFloat($scope.v113).toFixed(1));
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
        $scope.v121 = val;
        if($scope.v121 + $scope.v122 == 1){
          $scope.v123 = 0;
        } else if($scope.v121 + $scope.v122 > 1){
          $scope.v122 = 1- $scope.v111;
          $scope.v122 = parseFloat(parseFloat($scope.v222).toFixed(1));
          $scope.v123 = 0;
        } else if($scope.v121 + $scope.v122 < 1){
          $scope.v123 = 1 - $scope.v121 - $scope.v122;
          $scope.v123 = parseFloat(parseFloat($scope.v123).toFixed(1));
        }      
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
        $scope.v122 = val;
        if($scope.v121 + $scope.v122 == 1){
          $scope.v123 = 0;
        } else if($scope.v121 + $scope.v122 > 1){
          $scope.v121 = 1- $scope.v112;
          $scope.v121 = parseFloat(parseFloat($scope.v221).toFixed(1));
          $scope.v123 = 0;
        } else if($scope.v121 + $scope.v122 < 1){
          $scope.v123 = 1 - $scope.v121 - $scope.v122;
          $scope.v123 = parseFloat(parseFloat($scope.v123).toFixed(1));
        }  
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
        $scope.v123 = 0.3;
        $scope.v123 = 1 - $scope.v121 - $scope.v122;
        $scope.v123 = parseFloat(parseFloat($scope.v123).toFixed(1));
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




























  /*Variable 1 modulo 3 subsistema 1*/
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
        $scope.v131 = val;
        if($scope.v131 + $scope.v132 == 1){
          $scope.v133 = 0;
        } else if($scope.v131 + $scope.v132 > 1){
          $scope.v132 = 1- $scope.v131;
          $scope.v132 = parseFloat(parseFloat($scope.v132).toFixed(1));
          $scope.v133 = 0;
        } else if($scope.v131 + $scope.v132 < 1){
          $scope.v133 = 1 - $scope.v131 - $scope.v132;
          $scope.v133 = parseFloat(parseFloat($scope.v133).toFixed(1));
        } 
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

  /*Variable 2 modulo 3 subsistema 1*/
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
        $scope.v132 = val;
        if($scope.v131 + $scope.v132 == 1){
          $scope.v133 = 0;
        } else if($scope.v131 + $scope.v132 > 1){
          $scope.v131 = 1- $scope.v132;
          $scope.v131 = parseFloat(parseFloat($scope.v131).toFixed(1));
          $scope.v133 = 0;
        } else if($scope.v131 + $scope.v132 < 1){
          $scope.v133 = 1 - $scope.v131 - $scope.v132;
          $scope.v133 = parseFloat(parseFloat($scope.v133).toFixed(1));
        } 
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

  /*Variable 3 modulo 3 subsistema*/
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
        $scope.v133 = 1 - $scope.v131 - $scope.v132;
        $scope.v133 = parseFloat(parseFloat($scope.v133).toFixed(1));
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









































  /* Modulo 1 subsistema 2 */
  var updateModel16 = function(val){
    $scope.$apply(function(){
      if($scope.mod21 == "no definido" && $scope.mod22 == "no definido" && $scope.mod23 == "no definido"){
        $scope.m21 = 0;
        $scope.m22 = 0;
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" &&  $scope.mod22 != "no definido" && $scope.mod23 !="no definido"){
        $scope.m21 = 0.3;
        $scope.m22 = 0.3;
        $scope.m23 = 0.3;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" && $scope.mod22 == "no definido" && $scope.mod23 =="no definido"){
        $scope.m21 = 1;
        $scope.m22 = 0;
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" && $scope.mod22 != "no definido" && $scope.mod23 =="no definido"){
        $scope.m21 = val;
        $scope.m22 = 1 - $scope.m11 ;
        $scope.m22 = parseFloat(parseFloat($scope.m22).toFixed(1));
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }
    });
  }

  /* Modulo 2 subsistema 2 */
  var updateModel17 = function(val){
    $scope.$apply(function(){
      if($scope.mod21 == "no definido" && $scope.mod22 == "no definido" && $scope.mod23 == "no definido"){
        $scope.m21 = 0;
        $scope.m22 = 0;
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" &&  $scope.mod22 != "no definido" && $scope.mod23 !="no definido"){
        $scope.m21 = 0.3;
        $scope.m22 = 0.3;
        $scope.m23 = 0.3;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" && $scope.mod22 == "no definido" && $scope.mod23 =="no definido"){
        $scope.m21 = 1;
        $scope.m22 = 0;
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" && $scope.mod22 != "no definido" && $scope.mod23 =="no definido"){
        $scope.m22 = val;
        $scope.m21 = 1 - $scope.m11 ;
        $scope.m21 = parseFloat(parseFloat($scope.m21).toFixed(1));
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }
    });
  }

  /* Modulo 3 subsistema 2 */
  var updateModel18 = function(val){
    $scope.$apply(function(){
      if($scope.mod21 == "no definido" && $scope.mod22 == "no definido" && $scope.mod23 == "no definido"){
        $scope.m21 = 0;
        $scope.m22 = 0;
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" &&  $scope.mod22 != "no definido" && $scope.mod23 !="no definido"){
        $scope.m21 = 0.3;
        $scope.m22 = 0.3;
        $scope.m23 = 0.3;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else if($scope.mod21 != "no definido" && $scope.mod22 == "no definido" && $scope.mod23 =="no definido"){
        $scope.m21 = 1;
        $scope.m22 = 0;
        $scope.m23 = 0;
        angular.element("#slider16").slider('setValue',$scope.m21);
        angular.element("#slider17").slider('setValue',$scope.m22);
        angular.element("#slider18").slider('setValue',$scope.m23);
      }else{
        $scope.m23 = 0;
        angular.element("#slider18").slider('setValue',$scope.m23);
      }
    });
  }



























































  /*Variable 1 modulo 1 subsistema 2*/
  var updateModel19 =function(val){
     $scope.$apply(function(){
      if($scope.var211 == "no definido"  && $scope.var212 == "no definido" && $scope.var213 == "no definido"){
        $scope.v211 = 0;
        $scope.v212 = 0;
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" &&  $scope.var212 != "no definido" && $scope.var213 !="no definido"){
        $scope.v211 = 0.3;
        $scope.v212 = 0.3;
        $scope.v213 = 0.3;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" && $scope.var212 == "no definido" &&  $scope.var213 == "no definido"){
        $scope.v211 = 1;
        $scope.v212 = 0;
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" && $scope.var212 != "no definido" && $scope.var213 == "no definido"){
        $scope.v211 = val;
        $scope.v212 = 1 - $scope.v211;
        $scope.v212 = parseFloat(parseFloat($scope.v212).toFixed(1));
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }
     });
  }

  /*Variable 2 modulo 1 subsistema 2*/
  var updateModel20 =function(val){
     $scope.$apply(function(){
      if($scope.var211 == "no definido"  && $scope.var212 == "no definido" && $scope.var213 == "no definido"){
        $scope.v211 = 0;
        $scope.v212 = 0;
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" &&  $scope.var212 != "no definido" && $scope.var213 !="no definido"){
        $scope.v211 = 0.3;
        $scope.v212 = 0.3;
        $scope.v213 = 0.3;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" && $scope.var212 == "no definido" &&  $scope.var213 == "no definido"){
        $scope.v211 = 1;
        $scope.v212 = 0;
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" && $scope.var212 != "no definido" && $scope.var213 == "no definido"){
        $scope.v212 = val;
        $scope.v211 = 1 - $scope.v212;
        $scope.v211 = parseFloat(parseFloat($scope.v211).toFixed(1));
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }
     });
  }

  /*Variable 3 modulo 1 subsistema 2*/
  var updateModel21 =function(val){
     $scope.$apply(function(){
      if($scope.var211 == "no definido"  && $scope.var212 == "no definido" && $scope.var213 == "no definido"){
        $scope.v211 = 0;
        $scope.v212 = 0;
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" &&  $scope.var212 != "no definido" && $scope.var213 !="no definido"){
        $scope.v211 = 0.3;
        $scope.v212 = 0.3;
        $scope.v213 = 0.3;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" && $scope.var212 == "no definido" &&  $scope.var213 == "no definido"){
        $scope.v211 = 1;
        $scope.v212 = 0;
        $scope.v213 = 0;
        angular.element("#slider19").slider('setValue',$scope.v211);
        angular.element("#slider20").slider('setValue',$scope.v212);
        angular.element("#slider21").slider('setValue',$scope.v213);
      }else if($scope.var211 != "no definido" && $scope.var212 != "no definido" && $scope.var213 == "no definido"){
        $scope.v213 = 0;
        angular.element("#slider21").slider('setValue',$scope.v213);
      }
     });
  }

























































  /* Variable 1 modulo 2 subsistema 2*/
  var updateModel22 = function(val){
    $scope.$apply(function(){
      if($scope.var221 == "no definido"  && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
        $scope.v221 = 0;
        $scope.v222 = 0;
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }else if($scope.var221 != "no definido" && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
        $scope.v221 = 1;
        $scope.v222 = 0;
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }else if($scope.var221 != "no definido" && $scope.v222 != "no definido" && $scope.var223 == "no definido"){
        $scope.v221 = val;
        $scope.v222 = 1 - $scope.v221;
        $scope.v222 =  parseFloat(parseFloat($scope.v222).toFixed(1));
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }
    });
  }

  /* Variable 2 modulo 2 subsistema 2*/
  var updateModel23 = function(val){
    $scope.$apply(function(){
      if($scope.var221 == "no definido"  && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
        $scope.v221 = 0;
        $scope.v222 = 0;
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }else if($scope.var221 != "no definido" && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
        $scope.v221 = 1;
        $scope.v222 = 0;
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }else if($scope.var221 != "no definido" && $scope.v222 != "no definido" && $scope.var223 == "no definido"){
        $scope.v222 = val;
        $scope.v221 = 1 - $scope.v222;
        $scope.v221 =  parseFloat(parseFloat($scope.v221).toFixed(1));
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }
    });
  }

  /* Variable 3 modulo 2 subsistema 2*/
  var updateModel24 = function(val){
    $scope.$apply(function(){
      if($scope.var221 == "no definido"  && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
        $scope.v221 = 0;
        $scope.v222 = 0;
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }else if($scope.var221 != "no definido" && $scope.var222 == "no definido" && $scope.var223 == "no definido"){
        $scope.v221 = 1;
        $scope.v222 = 0;
        $scope.v223 = 0;
        angular.element("#slider22").slider('setValue',$scope.v221);
        angular.element("#slider23").slider('setValue',$scope.v222);
        angular.element("#slider24").slider('setValue',$scope.v223);
      }else if($scope.var221 != "no definido" && $scope.v222 != "no definido" && $scope.var223 == "no definido"){
        $scope.v223 = 0;
        angular.element("#slider24").slider('setValue',$scope.v223);
      }
    });
  }


























































  /* Variable 1 modulo 3 subsistema 2*/
  var updateModel25 = function(val){
    $scope.$apply(function(){
      if($scope.var231 == "no definido"  && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
        $scope.v231 = 0;
        $scope.v232 = 0;
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }else if($scope.var231 != "no definido" && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
        $scope.v231 = 1;
        $scope.v232 = 0;
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }else if($scope.var231 != "no definido" && $scope.v232 != "no definido" && $scope.var233 == "no definido"){
        $scope.v231 = val;
        $scope.v232 = 1 - $scope.v231;
        $scope.v232 =  parseFloat(parseFloat($scope.v232).toFixed(1));
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }
    });
  }

  /*Variable 2 moduloe 3 subsistema 2 */
  var updateModel26 = function(val){
    $scope.$apply(function(){
      if($scope.var231 == "no definido"  && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
        $scope.v231 = 0;
        $scope.v232 = 0;
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }else if($scope.var231 != "no definido" && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
        $scope.v231 = 1;
        $scope.v232 = 0;
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }else if($scope.var231 != "no definido" && $scope.v232 != "no definido" && $scope.var233 == "no definido"){
        $scope.v232 = val;
        $scope.v231 = 1 - $scope.v232;
        $scope.v231 =  parseFloat(parseFloat($scope.v231).toFixed(1));
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }
    });
  }

  /*Variable 3 modulo 3 subsistema 2*/
  var updateModel27 = function(val){
    $scope.$apply(function(){
      if($scope.var231 == "no definido"  && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
        $scope.v231 = 0;
        $scope.v232 = 0;
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }else if($scope.var231 != "no definido" && $scope.var232 == "no definido" && $scope.var233 == "no definido"){
        $scope.v231 = 1;
        $scope.v232 = 0;
        $scope.v233 = 0;
        angular.element("#slider25").slider('setValue',$scope.v231);
        angular.element("#slider26").slider('setValue',$scope.v232);
        angular.element("#slider27").slider('setValue',$scope.v233);
      }else if($scope.var231 != "no definido" && $scope.v232 != "no definido" && $scope.var233 == "no definido"){
        $scope.v233 = 0;
        angular.element("#slider27").slider('setValue',$scope.v233);
      }
    });
  }
















































  /*Modulo 1 subsistema 3*/
  var updateModel28 = function(val){
     $scope.$apply(function(){
      if($scope.mod31 == "no definido" && $scope.mod32 == "no definido" && $scope.mod33 == "no definido"){
        $scope.m31 = 0;
        $scope.m32 = 0;
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" && $scope.mod32 !="no definido" && $scope.mod33 != "no definido"){
        $scope.m31 = 0.3;
        $scope.m32 = 0.3;
        $scope.m33 = 0.3;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" && $scope.mod32 == "no definido" && $scope.mod33 =="no definido"){
        $scope.m31 = 1;
        $scope.m32 = 0;
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" && $scope.mod32 != "no definido" && $scope.mod33 =="no definido"){
        $scope.m31 = val;
        $scope.m32 = 1 - $scope.m31 ;
        $scope.m32 = parseFloat(parseFloat($scope.m32).toFixed(1));
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }

     }); 
  }

  /* Modulo 2 subsistema 3*/
  var updateModel29 = function(val){
     $scope.$apply(function(){
      if($scope.mod31 == "no definido" && $scope.mod32 == "no definido" && $scope.mod33 == "no definido"){
        $scope.m31 = 0;
        $scope.m32 = 0;
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" && $scope.mod32 !="no definido" && $scope.mod33 != "no definido"){
        $scope.m31 = 0.3;
        $scope.m32 = 0.3;
        $scope.m33 = 0.3;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" && $scope.mod32 == "no definido" && $scope.mod33 =="no definido"){
        $scope.m31 = 1;
        $scope.m32 = 0;
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" && $scope.mod32 != "no definido" && $scope.mod33 =="no definido"){
        $scope.m32 = val;
        $scope.m31 = 1 - $scope.m32 ;
        $scope.m31 = parseFloat(parseFloat($scope.m31).toFixed(1));
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }

     }); 
  }

  /* Modulo 3 subsistema 3*/
  var updateModel30 = function(val){
    $scope.$apply(function(){
      if($scope.mod31 == "no definido" && $scope.mod32 == "no definido" && $scope.mod33 == "no definido"){
        $scope.m31 = 0;
        $scope.m32 = 0;
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" &&  $scope.mod32 != "no definido" && $scope.mod33 !="no definido"){
        $scope.m31 = 0.3;
        $scope.m32 = 0.3;
        $scope.m33 = 0.3;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else if($scope.mod31 != "no definido" && $scope.mod32 == "no definido" && $scope.mod33 =="no definido"){
        $scope.m31 = 1;
        $scope.m32 = 0;
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m31);
        angular.element("#slider29").slider('setValue',$scope.m32);
        angular.element("#slider30").slider('setValue',$scope.m33);
      }else{
        $scope.m33 = 0;
        angular.element("#slider28").slider('setValue',$scope.m33);
      }
    });
  }

 /* Variable 1 modulo 1 subsistema 3*/
 var updateModel31 = function(val){
   $scope.$apply(function(){
    if($scope.var311 == "no definido"  && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
      $scope.v311 = 0;
      $scope.v312 = 0;
      $scope.v313 = 0;
      angular.element("#slider31").slider('setValue',$scope.v311);
      angular.element("#slider32").slider('setValue',$scope.v312);
      angular.element("#slider33").slider('setValue',$scope.v313);
    }else if($scope.var311 != "no definido" && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
        $scope.v311 = 1;
        $scope.v312 = 0;
        $scope.v313 = 0;
        angular.element("#slider31").slider('setValue',$scope.v311);
        angular.element("#slider32").slider('setValue',$scope.v312);
        angular.element("#slider33").slider('setValue',$scope.v313);
      }else if($scope.var311 != "no definido" && $scope.v312 != "no definido" && $scope.var313 == "no definido"){
        $scope.v311 = val;
        $scope.v312 = 1 - $scope.v311;
        $scope.v312 =  parseFloat(parseFloat($scope.v312).toFixed(1));
        $scope.v313 = 0;
        angular.element("#slider31").slider('setValue',$scope.v311);
        angular.element("#slider32").slider('setValue',$scope.v312);
        angular.element("#slider33").slider('setValue',$scope.v313);
      }
   });
 }


 /* Variable 2 modulo 1 subsistema 3*/
 var updateModel32 = function(val){
   $scope.$apply(function(){
    if($scope.var311 == "no definido"  && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
      $scope.v311 = 0;
      $scope.v312 = 0;
      $scope.v313 = 0;
      angular.element("#slider31").slider('setValue',$scope.v311);
      angular.element("#slider32").slider('setValue',$scope.v312);
      angular.element("#slider33").slider('setValue',$scope.v313);
    }else if($scope.var311 != "no definido" && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
        $scope.v311 = 1;
        $scope.v312 = 0;
        $scope.v313 = 0;
        angular.element("#slider31").slider('setValue',$scope.v311);
        angular.element("#slider32").slider('setValue',$scope.v312);
        angular.element("#slider33").slider('setValue',$scope.v313);
      }else if($scope.var311 != "no definido" && $scope.v312 != "no definido" && $scope.var313 == "no definido"){
        $scope.v312 = val;
        $scope.v311 = 1 - $scope.v312;
        $scope.v311 =  parseFloat(parseFloat($scope.v311).toFixed(1));
        $scope.v313 = 0;
        angular.element("#slider31").slider('setValue',$scope.v311);
        angular.element("#slider32").slider('setValue',$scope.v312);
        angular.element("#slider33").slider('setValue',$scope.v313);
      }
   });
 }


 /* Variable 3 modulo 1 subsistema 3*/
 var updateModel33 = function(val){
   $scope.$apply(function(){
    if($scope.var311 == "no definido"  && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
      $scope.v311 = 0;
      $scope.v312 = 0;
      $scope.v313 = 0;
      angular.element("#slider31").slider('setValue',$scope.v311);
      angular.element("#slider32").slider('setValue',$scope.v312);
      angular.element("#slider33").slider('setValue',$scope.v313);
    } else if($scope.var311 != "no definido" && $scope.var312 == "no definido" && $scope.var313 == "no definido"){
      $scope.v311 = 1;
      $scope.v312 = 0;
      $scope.v313 = 0;
      angular.element("#slider31").slider('setValue',$scope.v311);
      angular.element("#slider32").slider('setValue',$scope.v312);
      angular.element("#slider33").slider('setValue',$scope.v313);
    }else if($scope.var311 != "no definido" && $scope.v312 != "no definido" && $scope.var313 == "no definido"){
        $scope.v313 = 0;
        angular.element("#slider33").slider('setValue',$scope.v313);
      }
   });
 }

 /* Variable 1 modulo 2 subsistema 3*/
 var updateModel34 = function(val){
   $scope.$apply(function(){
    if($scope.var321 == "no definido"  && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
      $scope.v321 = 0;
      $scope.v322 = 0;
      $scope.v323 = 0;
      angular.element("#slider34").slider('setValue',$scope.v321);
      angular.element("#slider35").slider('setValue',$scope.v322);
      angular.element("#slider36").slider('setValue',$scope.v323);
    }else if($scope.var321 != "no definido" && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
        $scope.v321 = 1;
        $scope.v322 = 0;
        $scope.v323 = 0;
        angular.element("#slider34").slider('setValue',$scope.v321);
        angular.element("#slider35").slider('setValue',$scope.v322);
        angular.element("#slider36").slider('setValue',$scope.v323);
      }else if($scope.var321 != "no definido" && $scope.v322 != "no definido" && $scope.var323 == "no definido"){
        $scope.v321 = val;
        $scope.v322 = 1 - $scope.v321;
        $scope.v322 =  parseFloat(parseFloat($scope.v322).toFixed(1));
        $scope.v323 = 0;
        angular.element("#slider34").slider('setValue',$scope.v321);
        angular.element("#slider35").slider('setValue',$scope.v322);
        angular.element("#slider36").slider('setValue',$scope.v323);
      }
   });
 }


 /* Variable 2 modulo 2 subsistema 3*/
 var updateModel35 = function(val){
   $scope.$apply(function(){
    if($scope.var321 == "no definido"  && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
      $scope.v321 = 0;
      $scope.v322 = 0;
      $scope.v323 = 0;
      angular.element("#slider34").slider('setValue',$scope.v321);
      angular.element("#slider35").slider('setValue',$scope.v322);
      angular.element("#slider36").slider('setValue',$scope.v323);
    }else if($scope.var321 != "no definido" && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
        $scope.v321 = 1;
        $scope.v322 = 0;
        $scope.v323 = 0;
        angular.element("#slider34").slider('setValue',$scope.v321);
        angular.element("#slider35").slider('setValue',$scope.v322);
        angular.element("#slider36").slider('setValue',$scope.v323);
      }else if($scope.var321 != "no definido" && $scope.v322 != "no definido" && $scope.var323 == "no definido"){
        $scope.v322 = val;
        $scope.v321 = 1 - $scope.v322;
        $scope.v321 =  parseFloat(parseFloat($scope.v321).toFixed(1));
        $scope.v323 = 0;
        angular.element("#slider34").slider('setValue',$scope.v321);
        angular.element("#slider35").slider('setValue',$scope.v322);
        angular.element("#slider36").slider('setValue',$scope.v323);
      }
   });
 }


 /* Variable 3 modulo 2 subsistema 3*/
 var updateModel36 = function(val){
   $scope.$apply(function(){
    if($scope.var321 == "no definido"  && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
      $scope.v321 = 0;
      $scope.v322 = 0;
      $scope.v323 = 0;
      angular.element("#slider34").slider('setValue',$scope.v321);
      angular.element("#slider35").slider('setValue',$scope.v322);
      angular.element("#slider36").slider('setValue',$scope.v323);
    }else if($scope.var321 != "no definido" && $scope.var322 == "no definido" && $scope.var323 == "no definido"){
        $scope.v321 = 1;
        $scope.v322 = 0;
        $scope.v323 = 0;
        angular.element("#slider34").slider('setValue',$scope.v321);
        angular.element("#slider35").slider('setValue',$scope.v322);
        angular.element("#slider36").slider('setValue',$scope.v323);
      }else if($scope.var321 != "no definido" && $scope.v322 != "no definido" && $scope.var323 == "no definido"){
        $scope.v323 = 0;
        angular.element("#slider36").slider('setValue',$scope.v323);
      }
   });
 }

 /* Variable 1 modulo 3 subsistema 3*/
 var updateModel37 = function(val){
   $scope.$apply(function(){
    if($scope.var331 == "no definido"  && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
      $scope.v331 = 0;
      $scope.v332 = 0;
      $scope.v333 = 0;
      angular.element("#slider37").slider('setValue',$scope.v331);
      angular.element("#slider38").slider('setValue',$scope.v332);
      angular.element("#slider39").slider('setValue',$scope.v333);
    }else if($scope.var331 != "no definido" && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
        $scope.v331 = 1;
        $scope.v332 = 0;
        $scope.v333 = 0;
        angular.element("#slider37").slider('setValue',$scope.v331);
        angular.element("#slider38").slider('setValue',$scope.v332);
        angular.element("#slider39").slider('setValue',$scope.v333);
      }else if($scope.var331 != "no definido" && $scope.v332 != "no definido" && $scope.var333 == "no definido"){
        $scope.v331 = val;
        $scope.v332 = 1 - $scope.v331;
        $scope.v332 =  parseFloat(parseFloat($scope.v332).toFixed(1));
        $scope.v333 = 0;
        angular.element("#slider37").slider('setValue',$scope.v331);
        angular.element("#slider38").slider('setValue',$scope.v332);
        angular.element("#slider39").slider('setValue',$scope.v333);
      }
   });
 }


 /* Variable 2 modulo 3 subsistema 3*/
 var updateModel38 = function(val){
   $scope.$apply(function(){
    if($scope.var331 == "no definido"  && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
      $scope.v331 = 0;
      $scope.v332 = 0;
      $scope.v333 = 0;
      angular.element("#slider37").slider('setValue',$scope.v331);
      angular.element("#slider38").slider('setValue',$scope.v332);
      angular.element("#slider39").slider('setValue',$scope.v333);
    }else if($scope.var331 != "no definido" && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
        $scope.v331 = 1;
        $scope.v332 = 0;
        $scope.v333 = 0;
        angular.element("#slider37").slider('setValue',$scope.v331);
        angular.element("#slider38").slider('setValue',$scope.v332);
        angular.element("#slider39").slider('setValue',$scope.v333);
      }else if($scope.var331 != "no definido" && $scope.v332 != "no definido" && $scope.var333 == "no definido"){
        $scope.v332 = val;
        $scope.v331 = 1 - $scope.v332;
        $scope.v331 =  parseFloat(parseFloat($scope.v331).toFixed(1));
        $scope.v333 = 0;
        angular.element("#slider37").slider('setValue',$scope.v331);
        angular.element("#slider38").slider('setValue',$scope.v332);
        angular.element("#slider39").slider('setValue',$scope.v333);
      }
   });
 }


 /* Variable 3 modulo 3 subsistema 3*/
 var updateModel39 = function(val){
   $scope.$apply(function(){
    if($scope.var331 == "no definido"  && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
      $scope.v331 = 0;
      $scope.v332 = 0;
      $scope.v333 = 0;
      angular.element("#slider37").slider('setValue',$scope.v331);
      angular.element("#slider38").slider('setValue',$scope.v332);
      angular.element("#slider39").slider('setValue',$scope.v333);
    }else if($scope.var331 != "no definido" && $scope.var332 == "no definido" && $scope.var333 == "no definido"){
        $scope.v331 = 1;
        $scope.v332 = 0;
        $scope.v333 = 0;
        angular.element("#slider37").slider('setValue',$scope.v331);
        angular.element("#slider38").slider('setValue',$scope.v332);
        angular.element("#slider39").slider('setValue',$scope.v333);
      }else if($scope.var331 != "no definido" && $scope.v332 != "no definido" && $scope.var333 == "no definido"){
        $scope.v333 = 0;
        angular.element("#slider39").slider('setValue',$scope.v333);
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

  angular.element("#slider16").on('slideStop', function(data){
    updateModel16(data.value);
  });

  angular.element("#slider17").on('slideStop', function(data){
    updateModel17(data.value);
  });

  angular.element("#slider18").on('slideStop', function(data){
    updateModel18(data.value);
  });

  angular.element("#slider19").on('slideStop', function(data){
    updateModel19(data.value);
  });

  angular.element("#slider20").on('slideStop', function(data){
    updateModel20(data.value);
  });

  angular.element("#slider21").on('slideStop', function(data){
    updateModel21(data.value);
  });

  angular.element("#slider22").on('slideStop', function(data){
    updateModel22(data.value);
  });

  angular.element("#slider23").on('slideStop', function(data){
    updateModel23(data.value);
  });

  angular.element("#slider24").on('slideStop', function(data){
    updateModel24(data.value);
  });

  angular.element("#slider25").on('slideStop', function(data){
    updateModel25(data.value);
  });

  angular.element("#slider26").on('slideStop', function(data){
    updateModel26(data.value);
  });

  angular.element("#slider27").on('slideStop', function(data){
    updateModel27(data.value);
  });

  angular.element("#slider28").on('slideStop', function(data){
    updateModel28(data.value);
  });

  angular.element("#slider29").on('slideStop', function(data){
    updateModel29(data.value);
  });

  angular.element("#slider30").on('slideStop', function(data){
    updateModel30(data.value);
  });


  angular.element("#slider31").on('slideStop', function(data){
    updateModel31(data.value);
    });

  angular.element("#slider32").on('slideStop', function(data){
    updateModel32(data.value);
  });

  angular.element("#slider33").on('slideStop', function(data){
    updateModel33(data.value);
  });

  angular.element("#slider34").on('slideStop', function(data){
    updateModel34(data.value);
  });

  angular.element("#slider35").on('slideStop', function(data){
    updateModel35(data.value);
  });

  angular.element("#slider36").on('slideStop', function(data){
    updateModel36(data.value);
  });

  angular.element("#slider37").on('slideStop', function(data){
    updateModel37(data.value);
  });

  angular.element("#slider38").on('slideStop', function(data){
    updateModel38(data.value);
  });

  angular.element("#slider39").on('slideStop', function(data){
    updateModel39(data.value);
  });

  $scope.addPesos = function() {
    console.log("SCOPPEEEEEEEEEEE", $scope);
     $http.put('/api/pesos/'+idproyecto, {id_proyecto: idproyecto,
      sub1_id:s1_id,
      sub1_peso:$scope.s1,
      sub2_id:s2_id,
      sub2_peso:$scope.s2,
      sub3_id:s3_id,
      sub3_peso:$scope.s3,
      mod11_id:m11_id,
      mod11_peso:$scope.m11,
      mod12_id:m12_id,
      mod12_peso:$scope.m12,
      mod13_id:m13_id,
      mod13_peso:$scope.m13,
      var111_id: v111_id,
      var111_peso: $scope.v111,
      var112_id:v112_id,
      var112_peso:$scope.v112,
      var113_id:v113_id,
      var113_peso:$scope.v113,
      var121_id:v121_id,
      var121_peso: $scope.v121,
      var122_id:v122_id,
      var122_peso: $scope.v122,
      var123_id:v123_id,
      var123_peso: $scope.v123,
      var131_id:v131_id,
      var131_peso:$scope.v131,
      var132_id:v132_id,
      var132_peso:$scope.v132,
      var133_id:v133_id,
      var133_peso:$scope.v133,
      mod21_id:m21_id,
      mod21_peso: $scope.m21,
      mod22_id:m22_id,
      mod22_peso:$scope.m22,
      mod23_id:m23_id,
      mod23_peso:$scope.m23,
      var211_id:v211_id,
      var211_peso: $scope.v211,
      var212_id: v212_id, 
      var212_peso: $scope.v212, 
      var213_id: v213_id, 
      var213_peso:$scope.v213, 
      var221_id:v221_id, 
      var221_peso:$scope.v221, 
      var222_id:v222_id,
      var222_peso: $scope.v222, 
      var223_id:v223_id,
      var223_peso:$scope.v223,
      var231_id: v231_id,
      var231_peso:$scope.v231,
      var232_id: v232_id,
      var232_peso: $scope.v232,
      var233_id :v233_id,
      var233_peso: $scope.v233,
      mod31_id:m31_id,
      mod31_peso: $scope.m31,
      mod32_id:m32_id,
      mod32_peso:$scope.m32,
      mod33_id:m33_id,
      mod33_peso:$scope.m33,
      var311_id:v311_id,
      var311_peso: $scope.v311,
      var312_id: v312_id, 
      var312_peso: $scope.v312, 
      var313_id: v313_id, 
      var313_peso:$scope.v313,      
      var321_id:v321_id,
      var321_peso: $scope.v321,
      var322_id: v322_id, 
      var322_peso: $scope.v322, 
      var323_id: v323_id, 
      var323_peso:$scope.v323, 
      var331_id:v331_id, 
      var331_peso:$scope.v331,
      var332_id:v332_id, 
      var332_peso:$scope.v332,
      var333_id:v333_id, 
      var333_peso:$scope.v333}).success(function(data, status) {      
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