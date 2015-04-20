'use strict';

angular.module('app.controllers')
  .controller('RepresentacionesCtrl', function ($scope,$http,toaster, listafunciones, proyectosFactory,listaunidadesdeinformacion,listavariablesdefinidas) {
    var struct = listavariablesdefinidas.data;
    var funciones = listafunciones.data;
    var unidades = listaunidadesdeinformacion.data;
    var listafuncionesArray = [];
    var nombreVariables = ['s1m1v1','s1m1v2','s1m1v3','s1m2v1','s1m2v2','s1m2v3','s1m3v1','s1m3v2','s1m3v3'];
    console.log(struct);
    for (var i = 0; i < funciones.length; i++) {
      var valoresfuncion = [funciones[i].fun_val1,funciones[i].fun_val2,funciones[i].fun_val3,funciones[i].fun_val4,funciones[i].fun_val4,funciones[i].fun_val6,funciones[i].fun_val7,funciones[i].fun_val8,funciones[i].fun_val9,funciones[i].fun_id]
      //listafuncionesArray[i] = valoresfuncion;
      listafuncionesArray.push({idfuncion: funciones[i].fun_id,idvariable: funciones[i].var_id,valores: valoresfuncion});
    };
    //Buscar primero la funcion asociada a la variable, si no existe entonces haver un arreglo de null
    console.log(listafuncionesArray);
    console.log(unidades);
    $scope.arrayContains = function (arr,str) {
        for (var k = 0; k < arr.length; k++) {
            if(arr[k] == str){
                return k;
            }else{
                if (typeof arr[k].label != 'undefined'){
                    if(arr[k].label == str){
                        return k;
                    }
                }
            }
           
        };
         return -1;
    };

    $scope.arrayContainsUnidad = function (arr,str) {
        for (var k = 0; k < arr.length; k++) {
            if(arr[k].idunidad == str){
                return k;
            }else{
                if (typeof arr[k].label != 'undefined'){
                    if(arr[k].label == str){
                        return k;
                    }
                }
            }
           
        };
         return -1;
    };

    $scope.arrayContainsModulo = function (arr,str) {
        for (var k = 0; k < arr.length; k++) {
            if(arr[k].idmodulo == str){
                return k;
            }else{
                if (typeof arr[k].label != 'undefined'){
                    if(arr[k].label == str){
                        return k;
                    }
                }
            }
           
        };
         return -1;
    };
    /*
    var listaunidades = [];
    for (var i = 0; i < unidades.length; i++) {
      var pos = $scope.arrayContainsUnidad(listaunidades, unidades[i].un_id);
      if(pos>-1){
        var unidad = listaunidades[pos];
        unidad.data.push({var_id:unidades[i].variable_id, value:unidades[i].valor});
      }else{
        var unidad = {idunidad: unidades[i].un_id, data:[]};
        unidad.data.push({var_id:unidades[i].variable_id, value:unidades[i].valor});
        listaunidades.push(unidad);
      }
    };
    */
    $scope.arrayContainsVariable = function (arr,str) {
        for (var k = 0; k < arr.length; k++) {
            if(arr[k].idvariable == str){
                return k;
            }else{
                if (typeof arr[k].label != 'undefined'){
                    if(arr[k].label == str){
                        return k;
                    }
                }
            }
           
        };
         return -1;
    };
    var arrayVariables = [];
    for (var i = 0; i < unidades.length; i++) {
        var pos = $scope.arrayContainsVariable(arrayVariables, unidades[i].variable_id);
        var posFun = $scope.arrayContainsVariable(listafuncionesArray, unidades[i].variable_id);
        if(pos>-1){
            arrayVariables[pos].sumavalores += listafuncionesArray[posFun].valores[unidades[i].valor]; //aplicarle la funcion antes de sumar i guess
            arrayVariables[pos].sumandos++; 
        }else{
            arrayVariables.push({idvariable: unidades[i].variable_id, sumavalores:unidades[i].valor, sumandos: 1}); // igual aca
        }
        
    };
    console.log(arrayVariables);
    console.log(funciones);
    /*
    console.log(listafuncionesArray);
    var valoresGraficar=[];
    console.log(unidades);
    for (var i = 0; i < unidades.length; i++) {
      valoresGraficar.push({idunidad: unidades[i].un_id,idvariable:unidades[i].variable_id, valor: unidades[i].valor});
    };
    console.log(valoresGraficar);
    */
    var modulosArray = [];
    for (var i = 0; i < struct.length; i++) {
        if(struct[i].lev4 != null && struct[i].lev3 != null){
            pos = $scope.arrayContainsModulo(modulosArray, struct[i].moduloid);
            if(pos>-1){
                modulosArray[pos].variables.push({idvariable:struct[i].var_id,valor:null});
            }else{
                modulosArray.push({idmodulo:struct[i].moduloid,valor:null, variables:[{idvariable:struct[i].var_id,valor:null}]});
            }
        }
    };
    //modulos array ya tiene la estructura, faltan los valores;
    for (var i = 0; i < arrayVariables.length; i++) {
        arrayVariables[i]
    };

    console.log(modulosArray);
    var agrouparModulos = [];
    for (var i = 0; i < struct.length; i++) {
        struct[i]
    };
    var valoresGraficar=[];
    /*
    for (var i = 0; i < arrayVariables.length; i++) {
        valoresGraficar.push([i,arrayVariables[i].sumavalores/arrayVariables[i].sumandos]);
    };
    */
    //llenar valores en las variables
    for (var i = 0; i < arrayVariables.length; i++) {
        for (var j = 0; j < modulosArray.length; j++) {
            for (var k = 0; k < modulosArray[j].variables.length; k++) {
                if(modulosArray[j].variables[k].idvariable == arrayVariables[i].idvariable){
                    modulosArray[j].variables[k].valor = arrayVariables[i].sumavalores/arrayVariables[i].sumandos;
                }
                
            };
        };
    }; 
    //formar los valores a graficar agrupados
    var contador = 0;
    for (var j = 0; j < modulosArray.length; j++) {
        var valorModulo = 0;
        for (var k = 0; k < modulosArray[j].variables.length; k++) {
            valorModulo += modulosArray[j].variables[k].valor; // tomar en cuenta peso
            valoresGraficar.push([contador,modulosArray[j].variables[k].valor]);
            contador++;
        };
        valoresGraficar.push([contador,valorModulo]);
        contador ++;
    };
    console.log(modulosArray);
    /*
    for (var i = 0; i < unidades.length; i++) {
      $scope.arrayContains(listafuncionesArray,1);
      var valor = [[1,listafuncionesArray[0][unidades[i].un_s1m1v1-1]],[2,listafuncionesArray[1][unidades[i].un_s1m1v2-1]],[3,listafuncionesArray[2][unidades[i].un_s1m1v3-1]],[4,listafuncionesArray[0][unidades[i].un_s1m2v1-1]],[5,listafuncionesArray[1][unidades[i].un_s1m2v2-1]],[6,listafuncionesArray[2][unidades[i].un_s1m2v3-1]],[7,listafuncionesArray[0][unidades[i].un_s1m3v1-1]],[8,listafuncionesArray[1][unidades[i].un_s1m3v2-1]],[9,listafuncionesArray[2][unidades[i].un_s1m3v3-1]]];
      
    };
    console.log(valor);
    console.log(valor);
    */
    
    $scope.d = valoresGraficar;

  });
