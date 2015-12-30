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
                    $state.go('dashboard.home')
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
        /* event source that calls a function on every view switch */
        ScheduleController.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        ScheduleController.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };
        /* alert on eventClick */
        ScheduleController.alertOnEventClick = function( date, jsEvent, view){
            ScheduleController.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        ScheduleController.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            ScheduleController.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        ScheduleController.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            ScheduleController.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        ScheduleController.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };
        /* add custom event*/
        ScheduleController.addEvent = function() {
            ScheduleController.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        ScheduleController.remove = function(index) {
            ScheduleController.events.splice(index,1);
        };
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
        /* Render Tooltip */
        ScheduleController.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
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
                eventClick: ScheduleController.alertOnEventClick,
                eventDrop: ScheduleController.alertOnDrop,
                eventResize: ScheduleController.alertOnResize,
                eventRender: ScheduleController.eventRender
            }
        };

        ScheduleController.changeLang = function() {
            if(ScheduleController.changeTo === 'Hungarian'){
                ScheduleController.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                ScheduleController.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                ScheduleController.changeTo= 'English';
            } else {
                ScheduleController.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                ScheduleController.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                ScheduleController.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        ScheduleController.eventSources = [ScheduleController.events, ScheduleController.eventSource, ScheduleController.eventsF];
        ScheduleController.eventSources2 = [ScheduleController.calEventsExt, ScheduleController.eventsF, ScheduleController.events];
    }]);

});