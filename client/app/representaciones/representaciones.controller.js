'use strict';

angular.module('app.controllers')
  .controller('RepresentacionesCtrl', function ($scope,$http,toaster, listafunciones, proyectosFactory,listaunidadesdeinformacion) {
    var funciones = listafunciones.data;
    var unidades = listaunidadesdeinformacion.data;
    var listafuncionesArray = [];
    for (var i = 0; i < funciones.length; i++) {
      var valoresfuncion = [funciones[i].fun_val1,funciones[i].fun_val2,funciones[i].fun_val3,funciones[i].fun_val4,funciones[i].fun_val4,funciones[i].fun_val6,funciones[i].fun_val7,funciones[i].fun_val8,funciones[i].fun_val9]
      listafuncionesArray[i] = valoresfuncion;
    };
    //Buscar primero la funcion asociada a la variable, si no existe entonces haver un arreglo de null
    console.log(listafuncionesArray);
    var valoresGraficar=[];
    for (var i = 0; i < unidades.length; i++) {
      var valor = [[1,listafuncionesArray[0][unidades[i].un_s1m1v1-1]],[2,listafuncionesArray[1][unidades[i].un_s1m1v2-1]],[3,listafuncionesArray[2][unidades[i].un_s1m1v3-1]],[4,listafuncionesArray[0][unidades[i].un_s1m2v1-1]],[5,listafuncionesArray[1][unidades[i].un_s1m2v2-1]],[6,listafuncionesArray[2][unidades[i].un_s1m2v3-1]],[7,listafuncionesArray[0][unidades[i].un_s1m3v1-1]],[8,listafuncionesArray[1][unidades[i].un_s1m3v2-1]],[9,listafuncionesArray[2][unidades[i].un_s1m3v3-1]]];
      
    };
    console.log(valor);
    console.log(valor);
    $scope.d = valor;

  });
