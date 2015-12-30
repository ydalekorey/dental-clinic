'use strict';

requirejs.config({
    paths: {
        'angular': ['../bower_components/angular/angular'],
        'angular-ui-router': ['../bower_components/angular-ui-router/release/angular-ui-router'],
        'angular-bootstrap': ['../bower_components/angular-bootstrap/ui-bootstrap-tpls'],
        'angular-messages': ['../bower_components/angular-messages/angular-messages'],
        'angular-resource': ['../bower_components/angular-resource/angular-resource'],
        'angular-cookies': ['../bower_components/angular-cookies/angular-cookies'],
        'angular-sanitize': ['../bower_components/angular-sanitize/angular-sanitize'],
        'angular-animate': ['../bower_components/angular-animate/angular-animate'],
        'angular-touch': ['../bower_components/angular-touch/angular-touch'],
        'angular-route': ['../bower_components/angular-route/angular-route'],
        'angular-loading-bar': ['../bower_components/angular-loading-bar/build/loading-bar'],
        'angular-toggle-switch': ['../bower_components/angular-toggle-switch/angular-toggle-switch'],
        'angular-calendar': ['../bower_components/angular-ui-calendar/src/calendar'],
        'metis-menu': ['../bower_components/metisMenu/dist/metisMenu'],
        'jquery': ['../bower_components/jquery/dist/jquery'],
        'json3': ['../bower_components/json3/lib/json3'],
        'fullcalendar': ['../bower_components/fullcalendar/dist/fullcalendar'],
        'moment': ['../bower_components/moment/moment']
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-ui-router': ['angular'],
        'angular-bootstrap': ['angular'],
        'angular-resource': ['angular'],
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-animate': ['angular'],
        'angular-touch': ['angular'],
        'angular-route': ['angular'],
        'angular-messages': ['angular'],
        'angular-loading-bar': ['angular'],
        'angular-toggle-switch': ['angular'],
        'angular-calendar': ['angular','jquery', 'fullcalendar'],
        'metis-menu': ['jquery']
    }
});

require(['angular',
        'jquery',
        'metis-menu',
        'json3',
        'angular-ui-router',
        'angular-bootstrap',
        'angular-resource',
        'angular-messages',
        'angular-cookies',
        'angular-sanitize',
        'angular-animate',
        'angular-touch',
        'angular-route',
        'angular-loading-bar',
        'angular-toggle-switch',
        'angular-calendar',
        './controllers',
        './directives',
        './filters',
        './services'],
    function (angular, $) {

        var app = angular.module('dentalClinic', [
            'ui.router',
            'ui.bootstrap',
            'ui.calendar',
            'ngResource',
            'ngCookies',
            'ngSanitize',
            'ngAnimate',
            'ngTouch',
            'ngRoute',
            'ngMessages',
            'angular-loading-bar',
            'toggle-switch',
            'dentalClinic.controllers',
            'dentalClinic.filters',
            'dentalClinic.services',
            'dentalClinic.directives']).
        config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/dashboard/home');
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/main.html'
                })
                .state('dashboard.home', {
                    url: '/home',
                    controller: 'MainCtrl',
                    templateUrl: 'views/dashboard/home.html',
                    data: {
                        title: 'Home'
                    }
                })
                .state('dashboard.schedule', {
                    templateUrl: 'views/schedule.html',
                    controller: 'ScheduleController',
                    controllerAs: 'schedule',
                    url: '/schedule',
                    data: {
                        title: 'Schedule'
                    }
                })
                .state('dashboard.form', {
                    templateUrl: 'views/form.html',
                    url: '/form',
                    data: {
                        title: 'Form'
                    }
                })
                .state('dashboard.blank', {
                    templateUrl: 'views/pages/blank.html',
                    url: '/blank',
                    data: {
                        title: 'Blank'
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/pages/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login',
                    data: {
                        title: 'Login'
                    }
                })
                .state('dashboard.table', {
                    templateUrl: 'views/table.html',
                    url: '/table',
                    data: {
                        title: 'Table'
                    }
                })
                .state('dashboard.panels-wells', {
                    templateUrl: 'views/ui-elements/panels-wells.html',
                    url: '/panels-wells',
                    data: {
                        title: 'Panels Wells'
                    }
                })
                .state('dashboard.buttons', {
                    templateUrl: 'views/ui-elements/buttons.html',
                    url: '/buttons',
                    data: {
                        title: 'Buttons'
                    }
                })
                .state('dashboard.notifications', {
                    templateUrl: 'views/ui-elements/notifications.html',
                    url: '/notifications',
                    data: {
                        title: 'Notifications'
                    }
                })
                .state('dashboard.typography', {
                    templateUrl: 'views/ui-elements/typography.html',
                    url: '/typography',
                    data: {
                        title: 'Typography'
                    }
                })
                .state('dashboard.icons', {
                    templateUrl: 'views/ui-elements/icons.html',
                    url: '/icons',
                    data: {
                        title: 'Icons'
                    }
                })
                .state('dashboard.grid', {
                    templateUrl: 'views/ui-elements/grid.html',
                    url: '/grid',
                    data: {
                        title: 'Grid'
                    }
                })
        }]);

        app.run(function ($rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                $rootScope.title = '- ' + toState.data.title;
            });
        });

        angular.bootstrap(document, ['dentalClinic']);

    });
