var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/js',

    paths: {
        'angular': ['../bower_components/angular/angular'],
        'angular-mocks': ['../bower_components/angular-mocks/angular-mocks'],
        'angular-ui-router': ['../bower_components/angular-ui-router/release/angular-ui-router'],
        'angular-resource': ['../bower_components/angular-resource/angular-resource'],
        'angular-route': ['../bower_components/angular-route/angular-route'],
        'jquery': ['../bower_components/jquery/dist/jquery'],

        'login.html': ['../views/pages/login.html']
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-mocks': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-resource': ['angular'],
        'angular-route': ['angular'],

        'login.html':['angular']
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});