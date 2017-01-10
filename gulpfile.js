'use strict';

var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var Server = require('karma').Server;

var clientPath = path.join(__dirname, 'app');
var paths = {
    client: {
        mainScript: path.join(clientPath, 'main.js'),
        mainStyle: path.join(clientPath, 'styles.scss'),
        mainView: path.join(clientPath, 'index.html'),
        dest: path.join(__dirname, 'public')
    },
    server: {
        mainScript: path.join(__dirname, 'server.js')
    },
    karma: path.join(__dirname, 'karma.config.js')
};

var webpackConfig = {
    context: __dirname,
    entry: paths.client.mainScript,
    output: {
        path: paths.client.dest,
        filename: '[name].js'
    },
    module: {
        loaders: [{ test: /\.html$/, loader: 'html' }]
    },
    devtool: 'source-map',
    resolve: { root: clientPath }
};

gulp.task('default', ['serve', 'watch-client']);

gulp.task('serve', ['build-client'], function () {
    return nodemon({
        script: paths.server.mainScript,
        ignore: ['public/']
    });
});

// build tasks

gulp.task('build-client', ['clean-client', 'build-js', 'build-html', 'build-scss']);

gulp.task('build-js', ['clean-js'], function () {
    return gulp.src(webpackConfig.entry)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task('build-scss', ['clean-scss'], function () {
    return gulp.src(paths.client.mainStyle)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.client.dest));
});

gulp.task('build-html', ['clean-html'], function () {
    return gulp.src(paths.client.mainView)
        .pipe(gulp.dest(paths.client.dest));
});

// clean tasks

gulp.task('clean-client', ['clean-js', 'clean-scss', 'clean-html']);

gulp.task('clean-js', function () {
    return cleanByExtension('js');
});

gulp.task('clean-scss', function () {
    return cleanByExtension('css');
});

gulp.task('clean-html', function () {
    return cleanByExtension('html');
});

function cleanByExtension (ext) {
    return gulp.src(paths.client.dest + '/*.' + ext, { read: false })
        .pipe(clean());
}

// watch tasks

gulp.task('watch-client', ['watch-js', 'watch-html', 'watch-scss']);

gulp.task('watch-js', function () {
    // TODO exclude spec.js files
    gulp.watch([clientPath + '/**/*.js', clientPath + '/components/**/*.html'], ['build-js']);
});
gulp.task('watch-scss', ['build-scss'], function () {
    gulp.watch(clientPath + '/**/*.scss', ['build-scss']);
});
gulp.task('watch-html', function () {
    gulp.watch(clientPath + '/index.html', ['build-html']);
});

// test tasks

gulp.task('test', function (done) {
    new Server({
        configFile: paths.karma,
        singleRun: true
    }, done).start();
});
