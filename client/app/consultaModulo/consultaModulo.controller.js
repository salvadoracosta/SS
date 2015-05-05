'use strict';

angular.module('app.controllers')
  .controller('ConsultaModuloCtrl', function ($scope,$http,toaster, listamodulos,$state,$sce) {
 	$scope.listamodulos = listamodulos.data;
 	/*
 	$scope.consultando = false;


 	$scope.getHtml = function(html){
 	    return $sce.trustAsHtml(html);
 	};
 	console.log("TOASTEEEER", toaster);
 	$scope.registro = false;
 	$scope.toaster = {
 	    type: 'success',
 	    title: 'Titulo',
 	    text: 'Message'
 	};
   
    $scope.cerrar = function() {
		$scope.consultando = false;
    }

    $scope.consulta = function(modulo) {
        //console.log("CONSULTAAAAA");
        $scope.modulofocus = modulo;
       //console.log("modulofocus",modulo);
        $scope.consultando = true;
        $scope.mod_nombre = modulo.mod_nombre;
    }

    $scope.variables = function(modulo){
    	console.log("consultar modulos" ,modulo);
    	
    	$state.go('app.consultaVariable',{idmodulo:.mod_id})   
    }
    */
 });