'use strict';

define(['angular'], function (angular) {

    angular.module('dentalClinic.directives', []).
        directive('appVersion', ['version', function (version) {
            return function (scope, elm, attrs) {
                elm.text(version);
            };
        }]);

});