'use strict';

angular.module('app.controllers')
    .controller('SigninCtrl', function($scope, $http, $state) {
        $scope.tryLogIn = function() {
            $http.post('/api/login', {
                correo: $scope.user.email,
                password: $scope.user.password
            }).success(function(data, status) {
                $scope.status = status;
                $scope.data = data;
                console.log($scope);
                if ($scope.data[0].msj !== 'error') {
                    //aqui te manda al home, por que el log in esta bien 
                    $localStorage.token = $scope.data.token;
                    $localStorage.user = $scope.data.user;
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