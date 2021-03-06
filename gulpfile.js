"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');//Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transform React JSX to JS and transform also a limited set of es6 syntax constructs into es5
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var eslint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/build/toastr.min.css'
        ],
        mainJs: './src/main.js',
        dist: './dist'
    }
};

//Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//Open the index.html in the browser

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});


//Move html files from src to dist folder
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});


gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('eslint', function () {
    return gulp.src(config.paths.js)
        .pipe(eslint({ config: 'eslint.config.json' }))
        .pipe(eslint.format());
});

//Watch for changes in html
gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'eslint']);
});

gulp.task('default', ['html', 'js', 'eslint', 'css', 'open', 'watch']);