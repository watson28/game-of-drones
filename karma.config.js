'use strict';

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'app/main.spec.js'
        ],
        preprocessors: {
            'app/main.spec.js': ['webpack', 'sourcemap']
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
