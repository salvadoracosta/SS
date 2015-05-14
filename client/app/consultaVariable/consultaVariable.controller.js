'use strict';

angular.module('app.controllers')
  .controller('ConsultaVariableCtrl', function ($scope,$http,toaster, listavariables,$state,$sce) {
    $scope.listavariables = listavariables.data;
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

    $scope.consulta = function(variable) {
        //console.log("CONSULTAAAAA");
        $scope.variablefocus = variable;
       //console.log("variablefocus",variable);
        $scope.consultando = true;
        $scope.var_nombre = variable.var_nombre;
    }



 });