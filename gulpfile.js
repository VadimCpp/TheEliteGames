/**
 * Created by vadymkaninskyi on 02/04/16.
 */

var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('dist/**/*', {read: false})
        .pipe(clean());
});

gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'html'] );

gulp.task('default', ['build']);
