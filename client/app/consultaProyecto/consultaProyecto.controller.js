'use strict';

angular.module('app.controllers')
  .controller('ConsultaProyectoCtrl', function ($scope,$http,toaster, listaproyectos,usuariosFactory, $sce) {
  	$scope.listaproyectos = listaproyectos.data;
  	$scope.consultando = false;

    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

    console.log(toaster);
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
    var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviermbre", "Diciembre"
    ];

    $scope.cerrar = function() {
		$scope.consultando = false;
    }

    $scope.consulta = function(proyecto) {
    	usuariosFactory.getNameById(proyecto.pro_autor).then(function(response) {
	       var d = new Date(proyecto.pro_fecha);
	    	$scope.fecha = d.getDay()+' de '+monthNames[d.getMonth()]+', '+d.getFullYear();
	    	$scope.proyectoFocus = proyecto;
	    	$scope.consultando = true;
	    	$scope.autor = response.data[0].per_nombre;
	    });
    }

  });
