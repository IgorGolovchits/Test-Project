'use strict';

var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    prefixer = require('gulp-autoprefixer'),
    cssClean = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    rimraf = require('rimraf');

gulp.task('html:build', function () {
    gulp.src('main.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
});

gulp.task('js:build', function () {
    gulp.src('citiesJS.js')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('style:build', function () {
    gulp.src('decor.css')
        .pipe(pug({
            pretty:true
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssClean())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
]);

gulp.task('watch', function(){
    watch(['main.html'], function(event, cb) {
        gulp.start('html:build');
    });
    watch(['decor.css'], function(event, cb) {
        gulp.start('style:build');
    });
    watch(['citiesJS.js'], function(event, cb) {
        gulp.start('js:build');
    });
});


gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});

gulp.task('default', ['build', 'watch']);