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
        'metis-menu': ['../bower_components/metisMenu/dist/metisMenu'],
        'jquery': ['../bower_components/jquery/dist/jquery'],
        'json3': ['../bower_components/json3/lib/json3']
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
        './controllers',
        './directives',
        './filters',
        './services'],
    function (angular, $) {

        angular.module('dentalClinic', [
            'ui.router',
            'ui.bootstrap',
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
                        url:'/dashboard',
                        templateUrl: 'views/dashboard/main.html'
                    })
                    .state('dashboard.home',{
                        url:'/home',
                        controller: 'MainCtrl',
                        templateUrl:'views/dashboard/home.html'
                    })
                    .state('dashboard.form',{
                        templateUrl:'views/form.html',
                        url:'/form'
                    })
                    .state('dashboard.blank',{
                        templateUrl:'views/pages/blank.html',
                        url:'/blank'
                    })
                    .state('login',{
                        url:'/login',
                        templateUrl:'views/pages/login.html',
                        controller: 'LoginController',
                        controllerAs: 'login'
                    })
                    .state('dashboard.table',{
                        templateUrl:'views/table.html',
                        url:'/table'
                    })
                    .state('dashboard.panels-wells',{
                        templateUrl:'views/ui-elements/panels-wells.html',
                        url:'/panels-wells'
                    })
                    .state('dashboard.buttons',{
                        templateUrl:'views/ui-elements/buttons.html',
                        url:'/buttons'
                    })
                    .state('dashboard.notifications',{
                        templateUrl:'views/ui-elements/notifications.html',
                        url:'/notifications'
                    })
                    .state('dashboard.typography',{
                        templateUrl:'views/ui-elements/typography.html',
                        url:'/typography'
                    })
                    .state('dashboard.icons',{
                        templateUrl:'views/ui-elements/icons.html',
                        url:'/icons'
                    })
                    .state('dashboard.grid',{
                        templateUrl:'views/ui-elements/grid.html',
                        url:'/grid'
                    })
            }]);

        angular.bootstrap(document, ['dentalClinic']);

    });
