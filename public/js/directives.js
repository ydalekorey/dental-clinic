'use strict';

define(['angular'], function (angular) {

    var app = angular.module('dentalClinic.directives', []);

    app.directive('chat', function () {
        return {
            templateUrl: 'views/directives/chat.html',
            restrict: 'E',
            replace: true
        }
    });

    app.directive('stats',function() {
        return {
            templateUrl:'views/directives/stats.html',
            restrict:'E',
            replace:true,
            scope: {
                'model': '=',
                'comments': '@',
                'number': '@',
                'name': '@',
                'colour': '@',
                'details':'@',
                'type':'@',
                'goto':'@'
            }

        }
    });

    app.directive('header',function(){
        return {
            templateUrl:'views/directives/header.html',
            restrict: 'E',
            replace: true
        }
    });

    app.directive('headerNotification',function(){
        return {
            templateUrl:'views/directives/header-notification.html',
            restrict: 'E',
            replace: true
        }
    });

    app.directive('notifications',function(){
        return {
            templateUrl:'views/directives/notifications.html',
            restrict: 'E',
            replace: true
        }
    });

    app.directive('sidebar',['$location',function() {
        return {
            templateUrl:'views/directives/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;

                $scope.check = function(x){

                    if(x==$scope.collapseVar)
                        $scope.collapseVar = 0;
                    else
                        $scope.collapseVar = x;
                };

                $scope.multiCheck = function(y){

                    if(y==$scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };
            }
        }
    }]);

    app.directive('sidebarSearch',function() {
        return {
            templateUrl:'views/directives/sidebar-search.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'home';
            }
        }
    });

    app.directive('timeline',function() {
        return {
            templateUrl:'views/directives/timeline.html',
            restrict: 'E',
            replace: true
        }
    });

});