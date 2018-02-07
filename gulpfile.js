/**
 * Created by vadymkaninskyi on 02/04/16.
 */

var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var del = require('del');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gulpClosureCSSRenamer = require('gulp-closure-css-renamer');
var browserSync = require('browser-sync').create();


//
// Configure the browserSync task
//
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
});


gulp.task('js-dev', function() {
    return gulp.src(['dist/css/rename.js', 'src/js/theEliteGames/**/*.js', 'src/js/closure-library/closure/goog/**/*.js'])
        .pipe(closureCompiler({
                compilerPath: 'src/js/closure-library/closure/bin/build/compiler.jar',
                fileName: 'app.js',
                compilerFlags: {
                    closure_entry_point: 'theEliteGames.App',
                    // compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    compilation_level: 'WHITESPACE_ONLY',
                    only_closure_dependencies: true,
                    warning_level: 'VERBOSE'
                }
            })
        )
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js-release', function() {
    return gulp.src(['dist/css/rename.js', 'src/js/theEliteGames/**/*.js', 'src/js/closure-library/closure/goog/**/*.js'])
        .pipe(closureCompiler({
                compilerPath: 'src/js/closure-library/closure/bin/build/compiler.jar',
                fileName: 'dist/js/app.js',
                compilerFlags: {
                    closure_entry_point: 'theEliteGames.App',
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    //compilation_level: 'WHITESPACE_ONLY',
                    only_closure_dependencies: true,
                    warning_level: 'VERBOSE'
                }
            })
        )
        .pipe(gulp.dest('.'));
});


gulp.task('del', function () {
    return del([
        'dist/**/*'
    ]);
});


gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('robots', function() {
    return gulp.src('src/robots.txt')
        .pipe(gulp.dest('dist'));
});


gulp.task('favicon', function() {
    return gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist'));
});


gulp.task('data', function() {
    return gulp.src('src/data/data.json')
        .pipe(gulp.dest('dist/data'));
});


gulp.task('sass', function() {
    gulp.src('src/sass/style.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});


gulp.task('cssVocabulary', function() {
    gulp.src('dist/css/style.css')
        .pipe(gulpClosureCSSRenamer({
            sourceMap: true,
            compress: true,
            parseType: 'full',
            renameFile: './dist/css/rename.js'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('img', function() {
    return gulp.src(['src/img/**/*.png', 'src/img/**/*.jpg'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('build-dev', function(callback) {
    runSequence('del', 'html', 'robots', 'favicon', 'data', 'sass', 'cssVocabulary', 'img', 'js-dev', callback);
});


gulp.task('build-release', function(callback) {
    runSequence('del', 'html', 'robots', 'favicon', 'data', 'sass', 'cssVocabulary', 'img', 'js-release', callback);
});


gulp.task('watch', function() {
    gulp.watch('src/src/index.html', ['html']);
    gulp.watch('src/src/data/data.json', ['data']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/theEliteGames/**/*.js', ['build-dev']);
});


gulp.task('default', ['browserSync', 'build-dev', 'watch']);


// Deploy build to github pages
gulp.task('gh-pages', [ 'build-release' ], function(done) {
  var ghpages = require('gh-pages');

  ghpages.publish('dist', function(err) {
    if (err) return done(err);
    done();
  });
});
