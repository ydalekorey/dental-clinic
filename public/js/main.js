'use strict';

requirejs.config({
    paths: {
        'angular': ['../lib/angularjs/angular'],
        'angular-ui-router': ['../lib/angular-ui-router/angular-ui-router']
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        }
    }
});

require(['angular', 'angular-ui-router', './controllers', './directives', './filters', './services'],
    function (angular) {

        angular.module('dentalClinic', ['ui.router', 'dentalClinic.controllers', 'dentalClinic.filters', 'dentalClinic.services', 'dentalClinic.directives']).
            config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('application', {
                        abstract: true,
                        url: '/',
                        templateUrl: 'partials/application.html'
                    })
                    .state('application.calendar', {
                        url: 'calendar',
                        templateUrl: 'partials/calendar.html',
                        controller: 'CalendarController'
                    })
                    .state('application.patient', {
                        url: 'patient',
                        templateUrl: 'partials/patient.html',
                        controller: 'PatientController'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'partials/login.html'
                    });
                $urlRouterProvider.otherwise('/login');
                $urlRouterProvider.when('/', '/calendar');
            }]);

        angular.bootstrap(document, ['dentalClinic']);

    });
