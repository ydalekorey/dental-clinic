'use strict';

define(['angular'], function (angular) {

    var app = angular.module('dentalClinic.controllers', []);

    app.controller('MainCtrl', function($scope,$position) {
    });

    app.controller('FormCtrl', function($scope) {
    });


    app.controller('LoginController', ['$scope', '$state', 'Login', function ($scope, $state, Login) {

        $scope.wrongCredentials = false;

        $scope.resetWrongCredentials = function () {
            $scope.wrongCredentials = false;
        };

        $scope.login = function (credentials) {

            var postData = {
                "email": credentials.email,
                "password": credentials.password
            };
            Login.login({}, postData,
                function success(response) {
                    $state.go('dashboard.home')
                },
                function error(errorResponse) {
                    $scope.wrongCredentials = true;
                });


        }

    }]);

});