'use strict';

angular.module('app.controllers')
    .controller('SigninCtrl', function($scope, $http, $state,$localStorage) {
        $scope.tryLogIn = function() {
            $http.post('/login', {
                correo: $scope.user.email,
                password: $scope.user.password
            }).success(function(data, status) {
                $scope.status = status;
                $scope.data = data;
                console.log($scope);
                console.log($scope.data.token);
                if ($scope.data.msj !== 'error') {
                    //aqui te manda al home, por que el log in esta bien 
                    $localStorage.token = $scope.data.token;
                    //window.localStorage.setItem('token', $scope.data.token);
                    $state.go('app.dashboard-v1');
                } else {
                    $scope.authError = 'Nombre de usuario y/o contraseña incorrecta';
                }
            }).
            error(function(data, status, headers, config) {
                $scope.authError = 'Error, algo anda mal con nosotros, intente despues';
                $scope.status = status;
                console.log($scope);
            });

        };
    });