'use strict';

angular.module('app.controllers')
  .controller('unidadInformacionCtrl', function ($scope, $http, $state, toaster, idproyecto,listaunidadesdeinformacion, listavaloresvariablesindependientes,unidadesFactory,listavariablesindependientes,listavariablesdefinidas,$localStorage,listasubsistemas) {
    console.log(listavariablesdefinidas.data);
    $scope.listaunidadesdeinformacion = listaunidadesdeinformacion.data;
    console.log(listasubsistemas.data);
    $scope.arraysSubsistemas = [];
    var listasubsistemasArray = listasubsistemas.data;
    $scope.listavariablesindependientes = listavariablesindependientes.data;
    $scope.listavaloresvariablesindependientes = listavaloresvariablesindependientes.data;
    console.log($scope.listavariablesindependientes);
    //$scope.variablesjson = JSON.parse($scope.listavariablesindependientes[0].varind_valores);
    
    for (var i = 0; i < listasubsistemasArray.length; i++) {
      $scope.arraysSubsistemas[i] = {idsubsistema: listasubsistemasArray[i].sub_id,nombre:listasubsistemasArray[i].sub_nombre, data:[]}
    };

    
      $scope.alerts = [
      { type: 'danger', msg: 'Los valores solo pueden ser numericos y de 0-9' }
      ]; 
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    for (var i = 0; i < $scope.listavariablesindependientes.length; i++) {
      $scope.listavariablesindependientes[i].varind_valores = JSON.parse($scope.listavariablesindependientes[i].varind_valores);
    };
    var struct = listavariablesdefinidas.data;
    
    console.log($scope.variablesjson);
    console.log(struct);
    $scope.registro = false;
    $scope.toaster = {
        type: 'success',
        title: 'Titulo',
        text: 'Message'
    };
    $scope.unidad = {
      variablesindependientes:[]
    };

    $scope.vaiablesdefinidas = [];

    $scope.arrayContainsSubsistema = function (arr,str) {
        for (var k = 0; k < arr.length; k++) {
            if(arr[k].idsubsistema == str){
                return k;
            }else{
                console.log(arr[k]);
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

    var listaunidades = [];
    console.log($scope.listaunidadesdeinformacion);
    for (var i = 0; i < $scope.listaunidadesdeinformacion.length; i++) {
      var pos = $scope.arrayContainsUnidad(listaunidades, $scope.listaunidadesdeinformacion[i].un_id);
      if(pos>-1){
        var unidad = listaunidades[pos];
        unidad.data.push({var_id:$scope.listaunidadesdeinformacion[i].variable_id, value:$scope.listaunidadesdeinformacion[i].valor});
      }else{
        var unidad = {idunidad: $scope.listaunidadesdeinformacion[i].un_id, data:[]};
        unidad.data.push({var_id:$scope.listaunidadesdeinformacion[i].variable_id, value:$scope.listaunidadesdeinformacion[i].valor});
        listaunidades.push(unidad);
      }
    };
    $scope.listaunidades = listaunidades;
    console.log(listaunidades);

    for (var i = 0; i <struct.length; i++) {
      //console.log(struct[i].lev4 == null);
      if(struct[i].lev4 != null){
        var varnombre = struct[i].lev1 +'-'+ struct[i].lev2 +'-'+struct[i].lev3 +'-' +struct[i].lev4;
        struct[i].nombre = varnombre;
        $scope.arraysSubsistemas[$scope.arrayContainsSubsistema($scope.arraysSubsistemas,struct[i].subsistemaid)].data.push(struct[i]);
        $scope.vaiablesdefinidas.push(struct[i]);
      }
    };
    console.log($scope.arraysSubsistemas);
    /*
    $scope.unidad.un_s1m1v1=5;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.unidad.un_s1m1v1 = val;
      });
    };
    
    angular.element("#slider").on('slideStop', function(data){
      console.log('ENTRA EN EL SLIDER!!!!')
      updateModel(data.value);
    });
    */
    /*
    $scope.pop = function(){
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        console.log('pop');
        $scope.registro = false;
    };
    */
    /*
    El scope es digamos el estado de la pagina, aqui puedes crear variables para usar en la pagina y luego usaras para algo mas
    En este caso en la consola de chrome vamos a ver un mensaje de Hello
    $scope.message = 'Hello';
    console.log($scope.message);
    */

    /*
    Funcion para registrar a un proyecto
    */
    $scope.addUnidadInformacion = function() {
      $scope.unidad.variablesindependientes = $scope.listavariablesindependientes;
      $scope.unidad.variables = $scope.vaiablesdefinidas;
      $http.post('/api/unidad/'+idproyecto, { unidad: $scope.unidad}).success(function(data, status) {

          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Proyecto creado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadUnidades();
          $scope.registro = false;
          
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
      
    };

    $scope.showregistro = function () {
      $scope.registro = true;
    }

    $scope.notshowregistro = function () {
      $scope.form.$setPristine();
      $scope.registro = false;
    }
    $scope.notshowEdit = function () {
      $scope.formEdit.$setPristine();
      $scope.editando = false;
    }

    $scope.borrar = function (unidad) {
      console.log(unidad);
      $http.delete('/api/unidad/'+unidad.un_id).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.toaster.title = "Proyecto Eliminado";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.form.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadUnidades();
          //$state.go($state.current, {}, {reload: true});
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo borrar el proyecto, posiblemente es porblema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
    }

    $scope.reloadUnidades = function() {
      unidadesFactory.getListaUnidades(idproyecto).then(function(response) {
        console.log(response);
        $scope.listaunidadesdeinformacion = response.data;
        var listaunidades = [];
        console.log($scope.listaunidadesdeinformacion);
        for (var i = 0; i < $scope.listaunidadesdeinformacion.length; i++) {
          var pos = $scope.arrayContainsUnidad(listaunidades, $scope.listaunidadesdeinformacion[i].un_id);
          if(pos>-1){
            var unidad = listaunidades[pos];
            unidad.data.push({var_id:$scope.listaunidadesdeinformacion[i].variable_id, value:$scope.listaunidadesdeinformacion[i].valor});
          }else{
            var unidad = {idunidad: $scope.listaunidadesdeinformacion[i].un_id, data:[]};
            unidad.data.push({var_id:$scope.listaunidadesdeinformacion[i].variable_id, value:$scope.listaunidadesdeinformacion[i].valor});
            listaunidades.push(unidad);
          }
        };
        $scope.listaunidades = listaunidades;
      });
    }

    $scope.editar = function(unidad) {
      $scope.arraysSubsistemasEdit = angular.copy($scope.arraysSubsistemas);
      $scope.listavariablesindependientesFocus = angular.copy($scope.listavariablesindependientes);
      console.log(unidad);
      console.log($scope.listavariablesindependientesFocus);
      console.log($scope.listavaloresvariablesindependientes);
      for (var i = 0; i < $scope.arraysSubsistemasEdit.length; i++) {
        for (var j = 0; j < $scope.arraysSubsistemasEdit[i].data.length; j++) {
          for (var k = 0; k < unidad.data.length; k++) {
            if(unidad.data[k].var_id == $scope.arraysSubsistemasEdit[i].data[j].var_id ){
              $scope.arraysSubsistemasEdit[i].data[j].valueSelected = unidad.data[k].value;
            }
          };

        };
      };
      for (var i = 0; i < $scope.listavaloresvariablesindependientes.length; i++) {
        for (var j = 0; j < $scope.listavariablesindependientesFocus.length; j++) {
          if($scope.listavariablesindependientesFocus[j].varind_id == $scope.listavaloresvariablesindependientes[i].variable_id && unidad.idunidad == $scope.listavaloresvariablesindependientes[i].unidad_id){
            $scope.listavariablesindependientesFocus[j].value = $scope.listavaloresvariablesindependientes[i].value;
          }
        };
      };
      $scope.unidadfocus = unidad;
      $scope.editando = true;
      console.log($scope.unidadfocus);
      console.log($scope.listavariablesindependientesFocus);
    }

    $scope.editUnidad = function() {
      $scope.unidadfocus.variablesindependientes = $scope.listavariablesindependientesFocus;
      console.log($scope.unidadfocus);
      console.log($scope.arraysSubsistemasEdit);
      var variablesFocus = [];
      for (var i = 0; i < $scope.arraysSubsistemasEdit.length; i++) {
        for (var j = 0; j < $scope.arraysSubsistemasEdit[i].data.length; j++) {
          variablesFocus.push({idvariable: $scope.arraysSubsistemasEdit[i].data[j].var_id, value: $scope.arraysSubsistemasEdit[i].data[j].valueSelected});
        };
      };
      $scope.unidadfocus.variables = variablesFocus;
      $http.put('/api/unidad/'+$scope.unidadfocus.idunidad, { unidad: $scope.unidadfocus}).success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log($scope);
          
          $scope.authError = '';
          $scope.authSuccess = data[0].msj;
          $scope.toaster.title = "Unidad de Informacion editada";
          $scope.toaster.text = data[0].msj;
          $scope.toaster.type = "success"
          //$scope.nombre ='';
          //$scope.sigla = '';
          //$scope.modulos = '';
          $scope.formEdit.$setPristine();
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          console.log('pop');
          $scope.reloadUnidades();
          $scope.editando = false;
          
        }).
        error(function(data, status, headers, config) {
          $scope.status = status;
          $scope.toaster.title = "Error";
          $scope.toaster.text = "No se pudo editar el proyecto, posiblemente es problema de nosotros y no de usted";
          $scope.toaster.type = "error";
          toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
          $scope.authSuccess = '';
           console.log($scope);
        });
    };

  });