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


  $scope.proyecto = a_pesos[0].pn;

  /* subsistema 1 */
  $scope.sub1 = a_pesos[0].sn;
  /* subsistema 2 */
  var pos_sub2;
  var i;
  for(i = 1; i < a_pesos.length;i++){
    if(a_pesos[i].sn !=$scope.sub1){
      $scope.sub2 = a_pesos[i].sn;
      pos_sub2 = i;
      console.log("posicion de sub2", pos_sub2);
      break;
    }
  }

  /* subsistema 3 */
  var pos_sub3;
  for(i= pos_sub2; i < pesos.length;i++){
    if(a_pesos[i].sn != $scope.sub1 && a_pesos[i].sn != $scope.sub2){
      $scope.sub3 = a_pesos[i].sn;
      pos_sub3 = i;
    } 
  }

  if($scope.sub1 == null  && $scope.sub2 == null && $scope.sub3 == null){
    $scope.sub1 = $scope.sub2 = $scope.sub3 = "No definido";
    $scope.s1 = 0;        
    $scope.s2 = 0;
    $scope.s3 = 0;
  }else if($scope.sub1 != null && $scope.sub2 == null && $scope.sub3 == null){
    $scope.sub2 = $scope.sub3 = "No definido";
    $scope.s1 = 1;
    $scope.s2 = 0;
    $scope.s3 = 0;
  }else if($scope.sub1 != null && $scope.sub2 != null && $scope.sub3 == null){
    $scope.sub3 = "No definido";
    $scope.s3 = 0;
    if(a_pesos[0].sp == null && a_pesos[pos_sub2].sp ==null){
      $scope.s1 = 0.5;
      $scope.s2 = 0.5;
    }else if(a_pesos[0].sp ==null && a_pesos[pos_sub2].sp !=null){
      $scope.s2 = a_pesos[pos_sub2].sp;
      $scope.s1 = 1- $scope.s2;
    }else if(a_pesos[0].sp !=null && a_pesos[pos_sub2].sp ==null){
      $scope.s1 = a_pesos[0].sp;
      $scope.s2 = 1 -$scope.s1;
    }else{
      $scope.s1 = a_pesos[0].sp;
      $scope.s2 = a_pesos[pos_sub2].sp;
    }
  }else{
    if(a_pesos[0].sp == null && a_pesos[pos_sub2].sp ==null && a_pesos[pos_sub3].sp==null){
      $scope.s1 = 0.3;
      $scope.s2 = 0.3;
      $scope.s3 = 0.3;
    }else if(a_pesos[0].sp != null && a_pesos[pos_sub2].sp ==null && a_pesos[pos_sub3].sp==null){
      $scope.s1 = a_pesos[0].sp;
      $scope.s2 = $scope.s3 = (1- $scope.s1) /2;
    }else if(a_pesos[0].sp != null && a_pesos[pos_sub2].sp !=null && a_pesos[pos_sub3].sp==null){
      $scope.s1 = a_pesos[0].sp;
      $scope.s2 = a_pesos[pos_sub2].sp;
      $scope.s3 = 1- $scope.s1 -$scope.s2;
    }else{
      $scope.s1 = a_pesos[0].sp;
      $scope.s2 = a_pesos[pos_sub2].sp;
      $scope.s3 = a_pesos[pos_sub3].sp;
    }
  }


  /* MODULOS */

  /* modulo 1 primer subsistema*/
  $scope.mod11 = a_pesos[0].mn;
  /* modulo 2 primer subsistema*/
  var pos_mod12;
  var i;
  for(i = 1; i < a_pesos.length;i++){
    if(a_pesos[i].mn !=$scope.mod11){
      $scope.mod12 = a_pesos[i].mn;
      pos_mod12 = i;
      break;
    }
  }

  /* modulo 3 primer subsistema*/
  var pos_mod13;
  for(i= pos_mod12; i < pesos.length;i++){
    if(a_pesos[i].mn != $scope.mod11 && a_pesos[i].mn != $scope.mod12){
      $scope.mod13 = a_pesos[i].mn;
      pos_mod13 = i;
    }
  }

  if($scope.mod11 == null && $scope.mod12 == null && $scope.mod13 == null){
    $scope.mod11 = $scope.mod12 = $scope.mod13 = "No definido";
    $scope.m11 = $scope.m12 = $scope.m13 = 0;
  } else if($scope.mod11 != null && $scope.mod12 == null && $scope.mod13 == null){
    $scope.mod12 = $scope.mod13 ="No definido";
    $scope.m11 = 1;
    $scope.m12 = $scope.m13 = 0;
  } else if($scope.mod11 != null && $scope.mod12 !=null && $scope.mod13 ==null){
    $scope.mod13 = "No definido";
    $scope.m13 = 0;
    if(a_pesos[0].mp == null && a_pesos[pos_mod12].mp ==null){
      $scope.m11 = 0.5;
      $scope.m12 = 0.5;
    }else if(a_pesos[0].mp ==null && a_pesos[pos_mod12].mp !=null){
      $scope.m12 = a_pesos[pos_mod12].mp;
      $scope.m11 = 1- $scope.m12;
    }else if(a_pesos[0].mp !=null && a_pesos[pos_mod12].mp ==null){
      $scope.m11 = a_pesos[0].mp;
      $scope.m12 = 1 -$scope.m11;
    }else{
      $scope.m11 = a_pesos[0].mp;
      $scope.m12 = a_pesos[pos_mod12].mp;
    }
  }else{
    if(a_pesos[0].mp == null && a_pesos[pos_mod12].mp ==null && a_pesos[pos_sub3].mp==null){
      $scope.m11 = 0.3;
      $scope.m12 = 0.3;
      $scope.m13 = 0.3;
    }else if(a_pesos[0].mp != null && a_pesos[pos_mod12].mp ==null && a_pesos[pos_mod13].mp==null){
      $scope.m11 = a_pesos[0].mp;
      $scope.m12 = $scope.m13 = (1- $scope.m11) /2;
    }else if(a_pesos[0].mp != null && a_pesos[pos_mod12].mp !=null && a_pesos[pos_mod13].mp==null){
      $scope.m11 = a_pesos[0].mp;
      $scope.m12 = a_pesos[pos_sub2].mp;
      $scope.m13 = 1- $scope.m11 -$scope.m12;
    }else{
      $scope.m11 = a_pesos[0].mp;
      $scope.m12 = a_pesos[pos_mod12].mp;
      $scope.m13 = a_pesos[pos_mod13].mp;
    }
  }
  if(pos_sub2 ==null){
    $scope.mod21 = $scope.mod22 = $scope.mod23 = "No definido";
    $scope.m21 = $scope.m22 = $scope.m23 = 0;

  }else{
    /* modulo 1 segundo subsistema*/
    $scope.mod21 = a_pesos[pos_sub2].mn;
    /* modulo 2 segundo subsistema*/
    var pos_mod22;
    var i;
    for(i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn !=$scope.mod21){
        $scope.mod22 = a_pesos[i].mn;
        pos_mod22 = i;
        break;
      }
    }

    /* modulo 3 segundo subsistema*/
    var pos_mod23;
    for(i= pos_mod22; i < pesos.length;i++){
      if(a_pesos[i].mn != $scope.mod21 && a_pesos[i].mn != $scope.mod22){
        $scope.mod23 = a_pesos[i].mn;
        pos_mod23 = i;
      }
    }
    if($scope.mod21 == null && $scope.mod22 == null && $scope.mod23==null){
      $scope.m21 = $scope.m22 = $scope.m23= 0;
      $scope.mod21 = $scope.mod22 = $scope.mod23 = "No definido";
    }else if($scope.mod21 != null && $scope.mod22 ==null && $scope.mod23 ==null){
      $scope.mod22 = $scope.mod23 = "No definido";
      $scope.m22 = $scope.m23 = 0;
      $scope.m21 = 1;
    }else if($scope.mod21 != null && $scope.mod22 !=null && $scope.mod23 ==null){
      $scope.mod23 = "No definido";
      $scope.m23 = 0;
      if(a_pesos[0].mp == null && a_pesos[pos_mod22].mp ==null){
        $scope.m21 = 0.5;
        $scope.m22 = 0.5;
      }else if(a_pesos[0].mp ==null && a_pesos[pos_mod22].mp !=null){
        $scope.m22 = a_pesos[pos_mod22].mp;
        $scope.m21 = 1- $scope.m22;
      }else if(a_pesos[0].mp !=null && a_pesos[pos_mod22].mp ==null){
        $scope.m21 = a_pesos[0].mp;
        $scope.m22 = 1 -$scope.m21;
      }else{
        $scope.m21 = a_pesos[0].mp;
        $scope.m22 = a_pesos[pos_mod22].mp;
      }
    }else{
      if(a_pesos[pos_sub2].mp == null && a_pesos[pos_mod22].mp ==null && a_pesos[pos_mod23].mp==null){
        $scope.m21 = 0.3;
        $scope.m22 = 0.3;
        $scope.m23 = 0.3;
      }else if(a_pesos[pos_sub2].mp != null && a_pesos[pos_mod22].mp ==null && a_pesos[pos_mod23].mp==null){
        $scope.m21 = a_pesos[0].mp;
        $scope.m22 = $scope.m23 = (1- $scope.m11) /2;
      }else if(a_pesos[pos_sub2].mp != null && a_pesos[pos_mod22].mp !=null && a_pesos[pos_mod23].mp==null){
        $scope.m21 = a_pesos[0].mp;
        $scope.m22 = a_pesos[pos_sub2].mp;
        $scope.m23 = 1- $scope.m21 -$scope.m22;
      }else{
        $scope.m21 = a_pesos[0].mp;
        $scope.m22 = a_pesos[pos_mod22].mp;
        $scope.m23 = a_pesos[pos_mod23].mp;
      }
    }
  }


  if(pos_sub3==null){
    $scope.mod31  = $scope.mod32 = $scope.mod33 = "No definido";
    $scope.m31 = $scope.m32 = $scope.m33 = 0;  
  } else{
    /* modulo 1 tercer subsistema*/
    $scope.mod31 = a_pesos[pos_sub3].mn;
    /* modulo 2 tercer subsistema*/
    var pos_mod32;
    var i;
    for(i = 1; i < a_pesos.length;i++){
      if(a_pesos[i].mn !=$scope.mod31){
        $scope.mod32 = a_pesos[i].mn;
        pos_mod32 = i;
        break;
      }
    }

    /* modulo 3 tercer subsistema*/
    var pos_mod33;
    for(i= pos_mod32; i < pesos.length;i++){
      if(a_pesos[i].mn != $scope.mod31 && a_pesos[i].mn != $scope.mod32){
        $scope.mod33 = a_pesos[i].mn;
        pos_mod33 = i;
      }
    }
  }

  $scope.addPesos = function() {
    console.log("SCOPPEEEEEEEEEEE", $scope);
     $http.put('/api/pesos/'+idproyecto, {id_proyecto: idproyecto}).success(function(data, status) {      
     });
  };


  $scope.notshow = function(){ 

       $state.go('app.proyectoDesc');
    };
  

  var updateModel = function(val){
    $scope.$apply(function(){
      $scope.s1 = val;
    });
  };

  var updateModel2 = function(val){
    $scope.$apply(function(){
      $scope.s2 = val;
    });
  };

  var updateModel3 = function(val){
    $scope.$apply(function(){
      $scope.s3 = val;
    });
  };


  var updateModel4 = function(val){
    $scope.$apply(function(){
      $scope.m11 = val;
    });
  };

  var updateModel5 = function(val){
    $scope.$apply(function(){
      $scope.m12 = val;
    });
  };

  var updateModel6 = function(val){
    $scope.$apply(function(){
      $scope.m13 = val;
    });
  };


  var updateModel7 = function(val){
    $scope.$apply(function(){
      $scope.m21 = val;
    });
  };

  var updateModel8 = function(val){
    $scope.$apply(function(){
      $scope.m22 = val;
    });
  };

  var updateModel9 = function(val){
    $scope.$apply(function(){
      $scope.m23 = val;
    });
  };

  var updateModel10 = function(val){
    $scope.$apply(function(){
      $scope.m31 = val;
    });
  };

  var updateModel11 = function(val){
    $scope.$apply(function(){
      $scope.m32 = val;
    });
  };

  var updateModel12 = function(val){
    $scope.$apply(function(){
      $scope.m33 = val;
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

  angular.element("#slider10").on('slideStop', function(data){
    updateModel10(data.value);
  });

  angular.element("#slider11").on('slideStop', function(data){
    updateModel11(data.value);
  });

  angular.element("#slider12").on('slideStop', function(data){
    updateModel12(data.value);
  });

});