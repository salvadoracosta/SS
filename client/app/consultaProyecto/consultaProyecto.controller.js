'use strict';

angular.module('app.controllers')
  .controller('ConsultaProyectoCtrl', function ($scope,$http,toaster, listaproyectos) {
  	$scope.listaproyectos = listaproyectos.data;
  	$scope.consultando = false;
    console.log(toaster);
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
    
    $scope.consulta = function(proyecto) {
    	$scope.proyectoFocus = proyecto;
    	$scope.consultando = true;
    }

  });
