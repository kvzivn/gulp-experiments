;(function gulpUpdate() {
    'use strict';

    var gulp = require('gulp'),
        git = require('gulp-git'),
        bump = require('gulp-bump');

    gulp.task('bump', function (params) {
        gulp.src('./package.json')
            .pipe(bump({ type: gulp.env.type }))
            .pipe(gulp.dest('./'));
    });

    gulp.task('tag', function (done) {
      var pkg = require(process.cwd() + '/package.json');
      var v = 'v' + pkg.version;
      var message = 'Release ' + v;

      gulp.src('./*')
        .pipe(git.commit(message))
        .pipe(gulp.dest('./'))
        .on('end', tag);

      function tag () {
        git.tag(v, message);
        git.push('origin', 'master', { args: '--tags' }).done();
      }
    });

}());



