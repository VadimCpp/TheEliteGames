/**
 * Created by vadymkaninskyi on 02/04/16.
 */

var gulp = require('gulp');
var clean = require('gulp-clean');
var closureCompiler = require('gulp-closure-compiler');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');


gulp.task('js', function() {
    return gulp.src(['src/js/theEliteGames/**/*.js', 'src/js/closure-library/closure/goog/**/*.js'])
        .pipe(closureCompiler({
                compilerPath: 'src/js/closure-library/closure/bin/build/compiler.jar',
                fileName: 'app.js',
                compilerFlags: {
                    closure_entry_point: 'theEliteGames.App',
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    only_closure_dependencies: true,
                    warning_level: 'VERBOSE'
                }
            })
        )
        .pipe(gulp.dest('dist/js'));

});


gulp.task('clean', function () {
    return gulp.src(['app.js', 'dist/**/*'], {read: false})
        .pipe(clean());
});


gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('sass', function() {
    gulp.src('src/sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});


gulp.task('build', function(callback) {
    runSequence('clean', 'html', 'sass', 'js', callback);
});


gulp.task('watch', function() {
    gulp.watch('src/src/index.html', ['build']);
    gulp.watch('src/sass/style.scss', ['build']);
    gulp.watch('src/js/theEliteGames/**/*.js', ['build']);
});


gulp.task('default', ['build', 'watch']);
