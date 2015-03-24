/**
 *Created by khunter 3/25/15
 */

var gulp            = require('gulp');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var ngdocs          = require('gulp-ngdocs');
var runSequence     = require('run-sequence');

var buildDir        = 'bin/';

gulp. task('scripts', function ()
{
    var js = gulp.src('src/js/*.js');

    return js
        .pipe(concat('webchannel24.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bin'));
});

gulp.task('depsJS', function ()
{
    return gulp.src(['bower_components/modernizr/modernizr.js', 'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js', 'bower_components/angular/angular.min.js'])
        .pipe(concat('webchannel24.deps.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bin'));
});

gulp.task('sass', function ()
{
    gulp.src('src/css/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/'));
});

gulp.task('ngdocs', [], function ()
{
    var options = {
        html5mode: true,
        startPage: '/api',
        title: 'WebChannel24.com Docs',
        titleLink: '/api'
    };
    return gulp.src(['src/js/**/*.js'])
        .pipe(ngdocs.process(options))
        .pipe(gulp.dest('docs'));
});

gulp.task('default', function ()
{
    var js = gulp.src(['src/js/**/*.js']);
    return js.pipe(concat('webchannel24.js'))
        .pipe(gulp.dest('src'));
});

gulp.task('watch', function ()
{
    gulp.watch('src/**/*.js', ['default']);
    gulp.watch('src/**/*.scss', ['sass']);
});
