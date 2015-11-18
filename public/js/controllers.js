'use strict';

define(['angular'], function (angular) {

    var app = angular.module('dentalClinic.controllers', []);

    app.controller('MainCtrl', function($scope,$position) {
    });

    app.controller('FormCtrl', function($scope) {
    });


    app.controller('LoginController', ['$state', 'Authentication', function ($state, Authentication) {
        var LoginController = this;

        LoginController.wrongCredentials = false;

        LoginController.credentials = {email:"", password:""};

        LoginController.authenticate = function (credentials) {

            var postData = {
                "email": credentials.email,
                "password": credentials.password
            };
            Authentication.authenticate({}, postData,
                function success(response) {
                    $state.go('dashboard.home')
                },
                function error(errorResponse) {
                    LoginController.wrongCredentials = true;
                });


        };

        LoginController.hasErrors = function (field) {
            return LoginController.loginForm[field].$touched &&
                LoginController.loginForm[field].$invalid;
        }
    }]);

});