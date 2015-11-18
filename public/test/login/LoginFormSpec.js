'use strict';

define(['angular-mocks', 'controllers', 'login.html'], function () {

    describe('Login form', function () {
        var scope, ctrl;

        beforeEach(module('views/pages/login.html'));
        beforeEach(module('dentalClinic.controllers'));

        beforeEach(inject(function ($q, $rootScope, $controller, $templateCache, $compile) {
            var Authentication = {
                    authenticate: function () {
                        var deferred = $q.defer();
                        deferred.resolve({});
                        return deferred.promise;
                    }
                },
                state = {
                    go: function (path) {}
                };


            scope = $rootScope.$new();

            ctrl = $controller('LoginController', {
                Authentication: Authentication,
                $state: state
            });

            scope.login = ctrl;

            var templateHtml = $templateCache.get('views/pages/login.html');
            var loginForm = angular.element(templateHtml);
            $compile(loginForm)(scope);

            scope.$digest()
        }));

        it('should be invalid by default', function () {
            expect(ctrl.loginForm.$invalid).toBeTruthy();
        });

        it('should be valid with populated fields', function () {
            ctrl.credentials.email= 'some@email.com';
            ctrl.credentials.password= 'somepassword';

            scope.$digest();
            expect(ctrl.loginForm.$valid).toBeTruthy();
        });

        it('should have invalid email field if email is not correct', function () {
            ctrl.credentials.email= 'some@';

            scope.$digest();
            expect(ctrl.loginForm.email.$invalid).toBeTruthy();
        });

        it('should have invalid password field if empty', function () {
            ctrl.credentials.password= '';

            scope.$digest();
            expect(ctrl.loginForm.password.$invalid).toBeTruthy();
        });
    });
});