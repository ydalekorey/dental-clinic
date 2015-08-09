'use strict';

define(['angular'], function (angular) {

    var dentalClinic = angular.module('dentalClinic.controllers', []);

    dentalClinic.controller('CalendarController', ['$scope', function ($scope) {
        $scope.title = {text: "CalendarController"}
    }]);

    dentalClinic.controller('PatientController', ['$scope', function ($scope) {
        $scope.title = {text: 'PatientController'}
    }]);

    dentalClinic.controller('LoginController', ['$scope', '$state', function ($scope, $state) {
        $scope.submit = function () {
            if ($scope.username === 'Zorro' && $scope.password === 'secret') {
                $state.go('application.calendar')
            }
        }
    }]);

});