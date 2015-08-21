'use strict';

requirejs.config({
    paths: {
        'angular': ['../lib/angularjs/angular'],
        'angular-ui-router': ['../lib/angular-ui-router/angular-ui-router'],
        'angular-bootstrap': ['../lib/angular-ui-bootstrap/ui-bootstrap-tpls'],
        'angular-resource': ['../lib/angular-resource/angular-resource'],
        'angular-cookies': ['../lib/angular-cookies/angular-cookies'],
        'angular-sanitize': ['../lib/angular-sanitize/angular-sanitize'],
        'angular-animate': ['../lib/angular-animate/angular-animate'],
        'angular-touch': ['../lib/angular-touch/angular-touch'],
        'angular-route': ['../lib/angular-route/angular-route'],
        'angular-loading-bar': ['../lib/angular-loading-bar/build/loading-bar'],
        'angular-toggle-switch': ['../lib/angular-toggle-switch/angular-toggle-switch'],
        'metis-menu': ['../lib/metisMenu/dist/metisMenu'],
        'jquery': ['../lib/jquery/dist/jquery'],
        'json3': ['../lib/json3/lib/json3'],
    },
    shim: {
        'angular': {
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
                        templateUrl:'views/pages/login.html',
                        url:'/login'
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

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
        $(function() {
            $(window).bind("load resize", function() {
                var topOffset = 50;
                var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse');
                    topOffset = 100; // 2-row-menu
                } else {
                    $('div.navbar-collapse').removeClass('collapse');
                }

                var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
                height = height - topOffset;
                if (height < 1) height = 1;
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            });

            var url = window.location;
            var element = $('ul.nav a').filter(function() {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).addClass('active').parent().parent().addClass('in').parent();
            if (element.is('li')) {
                element.addClass('active');
            }
        });

    });
