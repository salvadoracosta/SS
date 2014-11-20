'use strict';

angular.module('app.controllers')
    .controller('HomeCtrl', function($scope, $http, $state,tree) {
        var treeArray = tree.data;
    console.log(treeArray.length);
    /*
    var treeArray = [];
    var children = ['Igneous', 'Sedimentary', 'Metamorphic'];
    var lvl3 = 
    treeArray[0]={label: 'Proyectos',children: proyectos}
    var modulos = 

    var label = "";
    for (var i = 0; i < tree.length; i++) {
        label = tree[i].lev1;
        for (var i = 0; i < tree.length; i++) {
            tree[i]
        };
        tree[i]
    };fruits.splice(0,1);  
    */
    
    var map = {}, node, roots = [];
    for (var i = 0; i < treeArray.length; i += 1) {
    node = treeArray[i];
    node.label = "";
    node.children = [];
    //map[node.lev2] = i; // use map to look-up the parents
    console.log(map);
    console.log(node);
    console.log(roots);
    if (node.lev3 !== "null") {
        //treeArray[map[node.lev1]].lvl3 = [];
        //treeArray[map[node.lev1]].lev3.push(node);
       console.log(node.lev3);
    } else {
        roots.push(node);
    }
    }
    console.log(roots); // <-- there's your tree

      $scope.my_data = [{
          label: 'Languages',
          children: [{
            label: 'Rock',
            children: ['Igneous', 'Sedimentary', 'Metamorphic']
          },'Less','Coffeescript']
        }];
    });