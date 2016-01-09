'use strict';

define(['angular'], function (angular) {

    var app = angular.module('dentalClinic.controllers', []);

    app.controller('MainCtrl', function($scope,$position) {
    });

    app.controller('FormCtrl', function($scope) {
    });


    app.controller('LoginController', ['$state', 'Authentication', function ($state, Authentication) {
        var LoginController = this;

        LoginController.wrongCredentials = false;

        LoginController.credentials = {email:"", password:""};

        LoginController.authenticate = function (credentials) {

            var postData = {
                "email": credentials.email,
                "password": credentials.password
            };
            Authentication.authenticate({}, postData,
                function success(response) {
                    $state.go('dashboard.schedule')
                },
                function error(errorResponse) {
                    LoginController.wrongCredentials = true;
                });


        };

        LoginController.hasErrors = function (field) {
            return LoginController.loginForm[field].$touched &&
                LoginController.loginForm[field].$invalid;
        }
    }]);

    app.controller('ScheduleController', ['$scope', '$compile', 'uiCalendarConfig', function($scope,$compile,uiCalendarConfig) {
        var ScheduleController = this,
        date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear();

        ScheduleController.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        ScheduleController.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        ScheduleController.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];

        /* Change View */
        ScheduleController.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };
        /* Change View */
        ScheduleController.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };

        /* config object */
        ScheduleController.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventRender: ScheduleController.eventRender
            }
        };


        /* event sources array*/
        ScheduleController.eventSources = [ScheduleController.events, ScheduleController.eventSource];
    }]);

});