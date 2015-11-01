'use strict';

define(['angular'], function (angular) {

    var services = angular.module('dentalClinic.services', ['ngResource']);

    services.factory('Login', ['$resource', function ($resource) {
        return $resource("/login", {}, {
            login: {method: 'POST', cache: false, isArray: false}
        });
    }]);


});