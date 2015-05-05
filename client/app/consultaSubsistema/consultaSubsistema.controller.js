'use strict';

angular.module('app.controllers')
  .controller('ConsultaSubsistemaCtrl', function ($scope,$http,toaster, listasubsistemas,$state,$sce) {
  	$scope.listasubsistemas = listasubsistemas.data;
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

    $scope.consulta = function(subsistema) {
        //console.log("CONSULTAAAAA");
        $scope.subsistemafocus = subsistema;
       //console.log("subsistemafocus",subsistema);
        $scope.consultando = true;
        $scope.sub_nombre = subsistema.sub_nombre;
    }

    $scope.modulos = function(subsistema){
    	console.log("consultar modulos" ,subsistema);
    	
    	$state.go('app.consultaModulo',{idsubsistema:subsistema.sub_id})   
    }
  });
