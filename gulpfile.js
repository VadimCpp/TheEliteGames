/**
 * Created by vadymkaninskyi on 02/04/16.
 */

var gulp = require('gulp');
var clean = require('gulp-clean');
var closureCompiler = require('gulp-closure-compiler');
var runSequence = require('run-sequence');

gulp.task('js', function() {
    return gulp.src(['src/js/app.js', 'src/js/closure-library/closure/goog/**/*.js'])
        .pipe(closureCompiler({
                compilerPath: 'src/js/closure-library/closure/bin/build/compiler.jar',
                fileName: 'app.js',
                compilerFlags: {
                    closure_entry_point: 'App',
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    //compilation_level: 'WHITESPACE_ONLY',
                    only_closure_dependencies: true,
                    warning_level: 'VERBOSE'
                }
            })
        )
        .pipe(gulp.dest('dist/js'));

});

gulp.task('clean', function () {
    return gulp.src('dist/**/*', {read: false})
        .pipe(clean());
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
    runSequence('clean', 'html', 'js', callback);
});

gulp.task('default', ['build']);
