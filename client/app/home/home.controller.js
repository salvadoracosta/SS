'use strict';

angular.module('app.controllers')
    .controller('HomeCtrl', function($scope, $http, $state,tree, $localStorage) {
        var treeArray = tree.data;
    console.log(treeArray.length);
    
    $scope.user = $localStorage.user;
    console.log($scope.user);
    $scope.logout = function() {
        delete $localStorage.user;
        delete $localStorage.token;
        $state.go('access.signin');
    }
    console.log($scope);
    
    $scope.arrayContains = function (arr,str) {
        for (var k = 0; k < arr.length; k++) {
            if(arr[k] == str){
                return k;
            }else{
                //console.log(arr[k]);
                if (typeof arr[k].label != 'undefined'){
                    if(arr[k].label == str){
                        return k;
                    }
                }
            }
           
        };
         return -1;
    };

    var tree = [];
    $scope.fillTree = function (steps) {
/*        console.log("STEPPPPPS", steps);
        console.log("lvl1", steps[0]);
        var lvl1 = steps[0];
        var lvl2 = steps[1];
        var contiene = $scope.arrayContains(tree,lvl1);
        var contiene2 = $scope.arrayContains(tree,lvl2);
        console.log("contiene", contiene);
        if(lvl1!=null && contiene == -1){
            console.log("Agregando al arbol")
           
            if(lvl2!=null && contiene2 == -1){
                console.log("tenemos subsistemas");
                tree.push({label: lvl1, children:[]});
            }else{
                tree.push(lvl1+'');
            }
        }*/
        console.log("STEPPPPPS", steps);
        console.log("lvl1", steps[0]);
        var lvl1 = steps[0];
        var lvl2 = steps[1];
        var lvl3 = steps[2];
        var lvl4 = steps[3];
       var current = null;
       var nivelMeter='';
       var existing = null;
       if(lvl2 == null){
        tree.push({label: lvl1,onSelect: function(branch){console.log(branch.data);}, data:{id:2}});
       }else{
            var pos = $scope.arrayContains(tree,lvl1);
            if(pos>-1){
                if(typeof tree[pos].children == null){
                    tree[pos] = {label: lvl1,onSelect: function(branch){console.log(branch);}, children:[]};
                    current = tree[pos].children;
                }else{
                    current = tree[pos].children;
                }
                if(lvl3 == null){
                    current.push(lvl2);
                }else{
                    var pos2 = $scope.arrayContains(current,lvl2);
                    if(pos2>-1){
                        console.log(current[pos2]);
                        if(typeof current[pos2].children == null){
                            current[pos2].children = [];
                            //current[pos2] = {label: lvl2, children:[]};
                            current = current[pos2].children;
                        }else{
                            current = current[pos2].children;
                        }
                        if(lvl4 == null){
                           current.push(lvl3); 
                        }else{
                            var pos3 = $scope.arrayContains(current,lvl3);
                            if(pos3>-1){
                                current = current[pos3].children;
                                current.push(lvl4);
                            }else{
                                    current.push({label: lvl3, children:[lvl4]});
                            }
                            
                       }
                    }else{
                        
                        if(lvl4 ==null){
                            current.push({label: lvl2, children:[lvl3]});
                        }else{
                            current.push({label: lvl2, children:[{label: lvl3, children:[lvl4]}]});
                        }
                    }
                }
            }else{
                tree.push({label: lvl1, children:[]});
                var pos = $scope.arrayContains(tree,lvl1);
                current = tree[pos].children;
                if(lvl3 == null){
                    current.push(lvl2);
                }else{
                    if(lvl4 ==null){
                        current.push({label: lvl2, children:[lvl3]});
                    }else{
                        current.push({label: lvl2, children:[{label: lvl3, children:[lvl4]}]});
                    }
                }
            }
       }
}

    for (var x=0; x < treeArray.length; x++) {
        try{
            var steps = [treeArray[x].lev1,treeArray[x].lev2,treeArray[x].lev3,treeArray[x].lev4];
        }catch(err){
            console.log(err);
            var steps = [{label: 'Error al cargar la estructura de tus proyectos', children:[]}];
        }
      
      console.log(steps);
      $scope.fillTree(steps);
      
    }
    $localStorage.tree = tree;
    console.log(tree);
    
    //$scope.my_data = tree;
    
      $scope.my_data = [{
          label: 'Los proyectos registrados son:',
          children: tree
        }];
    //console.log($scope.my_data2);
    //$scope.my_data = $scope.my_data2;
      
    });