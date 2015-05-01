;(function gulpStyles() {
    'use strict';

    var gulp = require('gulp'),
        stylus = require('gulp-stylus');

    gulp.task('styles', function styles() {
      gulp.src('./stylesheets/styles.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./stylesheets/styles.css'));
    });

}());