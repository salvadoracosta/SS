'use strict';

angular.module('app.controllers')
  .controller('RepresentacionesCtrl', function ($scope,$http,toaster, listafunciones, proyectosFactory,listaunidadesdeinformacion,listavariablesdefinidas,listavariablesindependientes) {
    var struct = listavariablesdefinidas.data;
    var funciones = listafunciones.data;
    var unidades = listaunidadesdeinformacion.data;
    $scope.listavariablesindependientes = listavariablesindependientes.data;
    for (var i = 0; i < $scope.listavariablesindependientes.length; i++) {
      $scope.listavariablesindependientes[i].varind_valores = JSON.parse($scope.listavariablesindependientes[i].varind_valores);
    };
    var listafuncionesArray = [];
    var nombreVariables = ['s1m1v1','s1m1v2','s1m1v3','s1m2v1','s1m2v2','s1m2v3','s1m3v1','s1m3v2','s1m3v3'];
    console.log(struct);
    $scope.d5 = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];
    for (var i = 0; i < funciones.length; i++) {
      var valoresfuncion = [funciones[i].fun_val1,funciones[i].fun_val2,funciones[i].fun_val3,funciones[i].fun_val4,funciones[i].fun_val4,funciones[i].fun_val6,funciones[i].fun_val7,funciones[i].fun_val8,funciones[i].fun_val9,funciones[i].fun_id]
      //listafuncionesArray[i] = valoresfuncion;
      listafuncionesArray.push({idfuncion: funciones[i].fun_id,idvariable: funciones[i].var_id,valores: valoresfuncion});
    };
    $scope.consulta = {};
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
    $scope.arrayContainsSubsistema = function (arr,str) {
        for (var k = 0; k < arr.length; k++) {
            if(arr[k].idsubsistema == str){
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

    var listaunidades = [];
    console.log($scope.listaunidadesdeinformacion);
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
    $scope.listaunidades = listaunidades;
    console.log($scope.listaunidades);

    var arrayVariables = [];
    $scope.arrayVariablesSeparadas = [];
    for (var i = 0; i < unidades.length; i++) {
        var pos = $scope.arrayContainsVariable(arrayVariables, unidades[i].variable_id);
        var posFun = $scope.arrayContainsVariable(listafuncionesArray, unidades[i].variable_id);
        if(pos>-1){
            arrayVariables[pos].sumavalores += listafuncionesArray[posFun].valores[unidades[i].valor]; //aplicarle la funcion antes de sumar i guess, *listafuncionesArray[posFun].peso
            arrayVariables[pos].sumandos++; 
            $scope.arrayVariablesSeparadas[pos].valores.push(unidades[i].valor);
        }else{
            arrayVariables.push({idvariable: unidades[i].variable_id, sumavalores:unidades[i].valor, sumandos: 1}); // igual aca
            $scope.arrayVariablesSeparadas.push({idvariable: unidades[i].variable_id,valores:[unidades[i].valor],valoresGraficar:[]});
        }
        
    };
    console.log(arrayVariables);
    console.log($scope.arrayVariablesSeparadas);
    console.log(funciones);

    for (var i = 0; i < $scope.arrayVariablesSeparadas.length; i++) {
        for (var j = 0; j < $scope.arrayVariablesSeparadas[i].valores.length; j++) {
            $scope.arrayVariablesSeparadas[i].valoresGraficar.push([j,$scope.arrayVariablesSeparadas[i].valores[j]]);
        };
    };
    /*
    console.log(listafuncionesArray);
    var valoresGraficar=[];
    console.log(unidades);
    for (var i = 0; i < unidades.length; i++) {
      valoresGraficar.push({idunidad: unidades[i].un_id,idvariable:unidades[i].variable_id, valor: unidades[i].valor});
    };
    console.log(valoresGraficar);
    */
    //llenar la estructura con modulos y variables
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


    //llenar todo!
    var subsistemasArray = [];
    for (var i = 0; i < struct.length; i++) {
        if(struct[i].lev4 != null && struct[i].lev3 != null){
            var pos = $scope.arrayContainsSubsistema(subsistemasArray, struct[i].subsistemaid);
            console.log(pos);
            console.log(subsistemasArray);
            if(pos>-1){
                var pos2 = $scope.arrayContainsModulo(subsistemasArray[pos].modulos, struct[i].moduloid);
                if(pos2>-1){
                    subsistemasArray[pos].modulos[pos2].variables.push({idvariable:struct[i].var_id,valor:null});
                }else{
                    subsistemasArray[pos].modulos.push({idmodulo: struct[i].moduloid, valor:null, variables:[{idvariable:struct[i].var_id,valor:null}]}); 
                }
            }else{
                subsistemasArray.push({idsubsistema: struct[i].subsistemaid, valor:null, modulos:[{idmodulo: struct[i].moduloid, valor:null, variables:[{idvariable:struct[i].var_id,valor:null}]}]});
            }
        }
    };
    console.log(subsistemasArray);
    var subsistemasPorUnidadOriginal = angular.copy(subsistemasArray);
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
    //llenar valores en las variables, me muero por dentro de ver 4 fors anidados ....

    for (var i = 0; i < arrayVariables.length; i++) {
        for (var l = 0; l < subsistemasArray.length; l++) {
            for (var j = 0; j < subsistemasArray[l].modulos.length; j++) {
                for (var k = 0; k < subsistemasArray[l].modulos[j].variables.length; k++) {
                    if(subsistemasArray[l].modulos[j].variables[k].idvariable == arrayVariables[i].idvariable){
                        subsistemasArray[l].modulos[j].variables[k].valor = arrayVariables[i].sumavalores/arrayVariables[i].sumandos;
                    }
                    
                };
            };
        };
    }; 
    var contador = 0;
        for (var l = 0; l < subsistemasArray.length; l++) {
            var valorSubsistema = 0;
            for (var j = 0; j < subsistemasArray[l].modulos.length; j++) {
                var valorModulo = 0;
                for (var k = 0; k < subsistemasArray[l].modulos[j].variables.length; k++) {
                    valorModulo += subsistemasArray[l].modulos[j].variables[k].valor; // tomar en cuenta peso
                    if(subsistemasArray[l].modulos[j].variables[k].valor != null){
                        console.log(subsistemasArray[l]);
                        valoresGraficar.push({color: 'rgb(218,209,93)', data: [[contador,subsistemasArray[l].modulos[j].variables[k].valor]]});
                        contador++;
                    }
                };
                valorSubsistema += valorModulo;
                if(valorModulo != 0){
                    valoresGraficar.push({ color: 'rgb(93,165,218)',data: [[contador,valorModulo]]} );
                    contador ++;
                }
            };
            if(valorSubsistema != 0){
                valoresGraficar.push({ color: 'rgb(218,93,103)',data: [[contador,valorSubsistema]]});
                contador ++;
            }
            
        };

    //formar los valores a graficar agrupados
    console.log(valoresGraficar);
    var data = [
    {color: 'red', data: [[1, 1]]},
    {color: 'yellow', data: [[2, 2],[3, 2]]},
    {color: 'orange', data: [[4, 2]]},
    {color: 'blue', data: [[5, 4],[6, 7]]},
    {color: '#000000', data: [[7, 1]]}
    ];
    var data2 =[{
    label: "TONTO",
    data: [[0, 3], [10, 3]]
}];
    /*
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
    */
    /*
    for (var i = 0; i < unidades.length; i++) {
    $scope.arrayContains(listafuncionesArray,1);
      var valor = [[1,listafuncionesArray[0][unidades[i].un_s1m1v1-1]],[2,listafuncionesArray[0][unidades[i].un_s1m1v2-1]],[3,listafuncionesArray[0][unidades[i].un_s1m1v3-1]],[4,listafuncionesArray[0][unidades[i].un_s1m2v1-1]],[5,listafuncionesArray[0][unidades[i].un_s1m2v2-1]],[6,listafuncionesArray[0][unidades[i].un_s1m2v3-1]],[7,listafuncionesArray[0][unidades[i].un_s1m3v1-1]],[8,listafuncionesArray[0][unidades[i].un_s1m3v2-1]],[9,listafuncionesArray[0][unidades[i].un_s1m3v3-1]]];
      
    };
    console.log(valor);
    console.log(valor);
    */
    //$scope.unidadSeleccionada = {};
    $scope.d = valoresGraficar;
    $scope.d3 = $scope.d;
    $scope.d2 = $scope.d;
    $scope.consultarPorVariable = function () {
        console.log($scope.consulta.variableSeleccionada);
        var pos = $scope.arrayContainsVariable($scope.arrayVariablesSeparadas,$scope.consulta.variableSeleccionada);
        if(pos>-1){
            $scope.d5 = $scope.arrayVariablesSeparadas[pos].valoresGraficar;
        }
    }
    $scope.consultarPorUnidad = function () {
        var subsistemasPorUnidad = angular.copy(subsistemasPorUnidadOriginal);
        var valoresGraficarPorUnidad=[];
        var pos = $scope.arrayContainsUnidad(listaunidades,$scope.consulta.unidadSeleccionada); 
        console.log(listaunidades[pos]);

        //llenar valores en las variables, me muero por dentro de ver 4 fors anidados ....
        for (var i = 0; i < listaunidades[pos].data.length; i++) {
            for (var l = 0; l < subsistemasPorUnidad.length; l++) {
                for (var j = 0; j < subsistemasPorUnidad[l].modulos.length; j++) {
                    for (var k = 0; k < subsistemasPorUnidad[l].modulos[j].variables.length; k++) {
                        if(subsistemasPorUnidad[l].modulos[j].variables[k].idvariable == listaunidades[pos].data[i].var_id){
                            subsistemasPorUnidad[l].modulos[j].variables[k].valor = listaunidades[pos].data[i].value;
                        }
                        
                    };
                };
            };
        };
        console.log(subsistemasPorUnidad);
        var contador = 0;
        for (var l = 0; l < subsistemasPorUnidad.length; l++) {
            var valorSubsistema = 0;
            for (var j = 0; j < subsistemasPorUnidad[l].modulos.length; j++) {
                var valorModulo = 0;
                for (var k = 0; k < subsistemasPorUnidad[l].modulos[j].variables.length; k++) {
                    valorModulo += subsistemasPorUnidad[l].modulos[j].variables[k].valor; // tomar en cuenta peso
                    if(subsistemasPorUnidad[l].modulos[j].variables[k].valor != null){
                        console.log(subsistemasPorUnidad[l]);
                        valoresGraficarPorUnidad.push({color: 'rgb(218,209,93)', data: [[contador,subsistemasPorUnidad[l].modulos[j].variables[k].valor]]});
                        contador++;
                    }
                };
                valorSubsistema += valorModulo;
                if(valorModulo != 0){
                    valoresGraficarPorUnidad.push({ color: 'rgb(93,165,218)',data: [[contador,valorModulo]]} );
                    contador ++;
                }
            };
            if(valorSubsistema != 0){
                valoresGraficarPorUnidad.push({ color: 'rgb(218,93,103)',data: [[contador,valorSubsistema]]});
                contador ++;
            }
            
        };
        console.log(valoresGraficarPorUnidad);
        $scope.d3 = valoresGraficarPorUnidad;
        }

        $scope.conultarPorUnidadesIndependientes = function () {
            var unidadesindependepientesconsulta = [];
            for (var i = 0; i < $scope.listavariablesindependientes.length; i++) {
                if(typeof $scope.listavariablesindependientes[i].valueSelected != "undefined"){
                    unidadesindependepientesconsulta.push($scope.listavariablesindependientes[i].valueSelected);
                }
            };
            console.log(unidadesindependepientesconsulta);
            $http.post('/api/unidad/consultaporvariablesindependientes', { variables: unidadesindependepientesconsulta}).success(function(data, status) {
                var subsistemasPorVariableIndependiente = angular.copy(subsistemasPorUnidadOriginal);
            $scope.status = status;
            $scope.data = data;
            console.log($scope.data);
            var arrayVariablesConsulta = [];
            var unidadesConsulta = $scope.data;
            for (var i = 0; i < unidadesConsulta.length; i++) {
                var pos = $scope.arrayContainsVariable(arrayVariablesConsulta, unidadesConsulta[i].variable_id);
                var posFun = $scope.arrayContainsVariable(listafuncionesArray, unidadesConsulta[i].variable_id);
                if(pos>-1){
                    arrayVariablesConsulta[pos].sumavalores += listafuncionesArray[posFun].valores[unidadesConsulta[i].valor]; //aplicarle la funcion antes de sumar i guess
                    arrayVariablesConsulta[pos].sumandos++; 
                }else{
                    arrayVariablesConsulta.push({idvariable: unidadesConsulta[i].variable_id, sumavalores:unidadesConsulta[i].valor, sumandos: 1}); // igual aca
                }
                
            };
              console.log(arrayVariablesConsulta);

            for (var i = 0; i < arrayVariablesConsulta.length; i++) {
                for (var l = 0; l < subsistemasPorVariableIndependiente.length; l++) {
                    for (var j = 0; j < subsistemasPorVariableIndependiente[l].modulos.length; j++) {
                        for (var k = 0; k < subsistemasPorVariableIndependiente[l].modulos[j].variables.length; k++) {
                            if(subsistemasPorVariableIndependiente[l].modulos[j].variables[k].idvariable == arrayVariablesConsulta[i].idvariable){
                                subsistemasPorVariableIndependiente[l].modulos[j].variables[k].valor = arrayVariablesConsulta[i].sumavalores/arrayVariablesConsulta[i].sumandos;
                            }
                            
                        };
                    };
                };
            }; 
              console.log(subsistemasPorVariableIndependiente);
              var valoresGraficarPorVariableIndependiente = [];
            var contador = 0;
            for (var l = 0; l < subsistemasPorVariableIndependiente.length; l++) {
                var valorSubsistema = 0;
                for (var j = 0; j < subsistemasPorVariableIndependiente[l].modulos.length; j++) {
                    var valorModulo = 0;
                    for (var k = 0; k < subsistemasPorVariableIndependiente[l].modulos[j].variables.length; k++) {
                        valorModulo += subsistemasPorVariableIndependiente[l].modulos[j].variables[k].valor; // tomar en cuenta peso
                        if(subsistemasPorVariableIndependiente[l].modulos[j].variables[k].valor != null){
                            console.log(subsistemasPorVariableIndependiente[l]);
                            valoresGraficarPorVariableIndependiente.push({color: 'rgb(218,209,93)', data: [[contador,subsistemasPorVariableIndependiente[l].modulos[j].variables[k].valor]]});
                            contador++;
                        }
                    };
                    valorSubsistema += valorModulo;
                    if(valorModulo != 0){
                        valoresGraficarPorVariableIndependiente.push({ color: 'rgb(93,165,218)',data: [[contador,valorModulo]]} );
                        contador ++;
                    }
                };
                if(valorSubsistema != 0){
                    valoresGraficarPorVariableIndependiente.push({ color: 'rgb(218,93,103)',data: [[contador,valorSubsistema]]});
                    contador ++;
                }
                
            };
            console.log(valoresGraficarPorVariableIndependiente);
            $scope.d2 = valoresGraficarPorVariableIndependiente;
            }).
            error(function(data, status, headers, config) {
              $scope.status = status;
              $scope.toaster.title = "Error";
              $scope.toaster.text = "No se pudo registrar el nuevo proyecto, posiblemente es porblema de nosotros y no de usted";
              $scope.toaster.type = "error";
              toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
              $scope.authSuccess = '';
               console.log($scope);
            });
        }
  });
