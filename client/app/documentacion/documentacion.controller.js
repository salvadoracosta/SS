'use strict';

angular.module('app.controllers')
  .controller('DocumentacionCtrl', function ($scope,$http,toaster,$state,listadocumentos,$sce) {
  	$scope.listadocumentos = listadocumentos.data;
    console.log($scope.listadocumentos);
    for (var i = 0; i < $scope.listadocumentos.length; i++) {
        $scope.listadocumentos[i].texto = $sce.trustAsHtml($scope.listadocumentos[i].texto);
    };
  });
