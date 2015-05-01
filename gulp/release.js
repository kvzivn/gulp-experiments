;(function gulpUpdate() {
    'use strict';

    var gulp = require('gulp'),
        git = require('gulp-git'),
        bump = require('gulp-bump');

    gulp.task('bump', function bump() {
      var bumpType = process.env.BUMP || 'patch'; // major.minor.patch

      return gulp.src(['./package.json'])
        .pipe(bump({ type: bumpType }))
        .pipe(gulp.dest('./'));
    });

    gulp.task('tag', ['bump'], function (done) {
      var pkg = require('./package.json');
      var v = 'v' + pkg.version;
      var message = 'Release ' + v;

      gulp.src('./')
        .pipe(git.commit(message))
        .pipe(gulp.dest('./'))
        .on('end', tag);

      function tag () {
        git.tag(v, message);
        git.push('origin', 'master', { args: '--tags' }).end();
        done();
      }
    });

    gulp.task('release', ['tag']);

}());



