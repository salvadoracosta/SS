'use strict';

angular.module('app.controllers')
.controller('PesoDescCtrl', function ($scope,$http,toaster,pesos,pesosFactory){
    console.log(toaster);
    var treeArray = pesos.data;
    console.log("pesosFactory", pesosFactory);
    console.log("prueba", pesos.data);
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };

    /*Nombre del subsistema*/
    
    console.log("valoor", treeArray[0].sn);
    $scope.sub1 = treeArray[0].sn;

    var i
    console.log("longitud", treeArray.length);
    for (i=1 ; i<treeArray.length;i++){
        console.log(treeArray[i].sn);
        if(treeArray[i].sn != treeArray[0].sn){
            $scope.sub2 = treeArray[i].sn;
            break;
        }
    }
    if($scope.sub2 !=null){
        var j
        for (j=2 ; j<treeArray.length;j++){
         console.log(treeArray[j].sn);   
         if(treeArray[j].sn != treeArray[0].sn && treeArray[j].sn != $scope.sub2){
            $scope.sub3 =treeArray[j].sn;
            break;
            }
        }
    }

    /*Nombre de los modulos*/
    
    $scope.mod1 = treeArray[0].mn;
    var k
    for(k=1;k < treeArray.length;k++){
        if(treeArray[k].sn = $scope.sub1 && $scope.mod1 != treeArray[k].mn){
            console.log("entramos al if");
            $scope.mod2 = treeArray[k].mn;

        }
    }
    for(k=2;k < treeArray.length;k++){
        if(treeArray[k].sn =$scope.sub1 &&$scope.mod1 != treeArray[k].mn && $scope.mod2!=treeArray[k].mn){
            $scope.mod3 =treeArray[k].mn;
        }
    }
    if($scope.mod1  !=null & $scope.mod2 !=null && $scope.mod3!=null){
        $scope.m1 = 0.3;
        $scope.m2 = 0.3;
        $scope.m3 = 0.3;
    }else if($scope.mod1  !=null & $scope.mod2 !=null){
        $scope.m1 = 0.5;
        $scope.m2 = 0.5;
        $scope.m3 = 0;
    }else{
        $scope.m1 = 1;
        $scope.m2 = 0;
        $scope.m3 = 0;
    }

    /*Nombre variables*/

    $scope.var1 = treeArray[0].vn;
    var k
    for(k=1;k < treeArray.length;k++){
        if(treeArray[k].mn = $scope.mod1 && $scope.var1 != treeArray[k].vn){
            console.log("entramos al if");
            $scope.var2 = treeArray[k].vn;
            break;
        }
    }
    for(k=2;k < treeArray.length;k++){
        if(treeArray[k].mn =$scope.mod1 &&$scope.var1 != treeArray[k].vn && $scope.var2!=treeArray[k].vn){
            $scope.var3 =treeArray[k].vn;
        }
    }
    

    if($scope.var1  !=null & $scope.var2 !=null && $scope.var3!=null){
        $scope.v1 = 0.3;
        $scope.v2 = 0.3;
        $scope.v3 = 0.3;
    }else if($scope.var1  !=null & $scope.var2 !=null){
        $scope.v1 = 0.5;
        $scope.v2 = 0.5;
        $scope.v3 = 0;
    }else{
        $scope.v1 = 1;
        $scope.v2 = 0;
        $scope.v3 = 0;
    }

});