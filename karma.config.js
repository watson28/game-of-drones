'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
            'app/mocks/mockedServices.js',
            'app/main.spec.js',
            'app/components/**/*.spec.js'
        ],
        preprocessors: {
            'app/**/*.js': ['webpack']
        },
        webpack: {
            context: __dirname,
            module: {
                loaders: [{ test: /\.html$/, loader: 'html' }]
            },
            devtool: 'inline-source-map',
            resolve: { root: 'app' }
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS2'],
        singleRun: true
    });
};
