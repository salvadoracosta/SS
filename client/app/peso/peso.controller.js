'use strict';

angular.module('app.controllers')
  .controller('PesoCtrl', function ($scope,$http,toaster) {
    console.log(toaster);
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
    

  });
