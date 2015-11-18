'use strict';

define(['angular'], function (angular) {

    var services = angular.module('dentalClinic.services', ['ngResource']);

    services.factory('Authentication', ['$resource', function ($resource) {
        return $resource("/login", {}, {
            authenticate: {method: 'POST', cache: false, isArray: false}
        });
    }]);


});