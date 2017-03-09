var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    csslint = require('gulp-csslint'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    ts = require('gulp-typescript'),
    jsx = require('gulp-jsx'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    cleanCSS = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css'),
    jsonlint = require("gulp-jsonlint"),
    markdown = require('gulp-markdown'),
    minify = require('gulp-minify'),
    sass = require('gulp-sass');

gulp.task('default', function() {
    return gutil.log('Gulp Initiated...')
});

gulp.task('css', function() {
    gulp.src('public/stylesheets/*.css')
        .pipe(csslint())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(csslint.formatter());
});

gulp.task('jshint', function() {
    /*gulp.src('public/assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish')); */


    gulp.src('public/assets/js/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['app.js']
        }))
        .pipe(gulp.dest('public/builds/assets/js'));

    return gutil.log('JS Minification Completed...')
});

gulp.task('sass', function () {
    gulp.src('public/stylesheets/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/assets/css'));

    gulp.src('public/assets/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(csslint.formatter())
        .pipe(gulp.dest('public/builds/assets/css'));

    return gutil.log('CSS Minification Completed...')
});

gulp.task('less', function () {
    return gulp.src('public/stylesheets/**/*.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(gulp.dest('app/css'));

});

gulp.task('typescript', function () {
    return gulp.src('public/javascripts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest('public/javascripts'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('jadeHTML', function() {
    return gulp.src('views/*.jade')
        .pipe(jade({
            locals: {}
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('coffee', function() {
    gulp.src('public/javascripts/**/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('app/js'));
});

gulp.task('bundleCSS', function () {
    gulp.src('public/stylesheets/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('app/css'));

    return gutil.log('Bundled..')
});

gulp.task('jsonLinter', function () {

    return gulp.src("public/**/*.json")
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());

});

gulp.task('mdHTML', function () {
    return gulp.src('public/**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('app'));
});

gulp.task('copier', function () {

    gulp.src('public/assets/images/*').pipe(gulp.dest('public/builds/assets/images'));
    gulp.src('public/assets/fonts/*').pipe(gulp.dest('public/builds/assets/fonts'));

    return gutil.log('Font/Image Copy Completed..')
});

gulp.task('default', ['watch','sass','jshint','copier']);

gulp.task('watch', function() {

    gulp.watch('public/assets/**/*.js', ['jshint']);
    gulp.watch('public/stylesheets/*.sass', ['sass']);
    gulp.watch('public/**/*.json', ['jsonLinter']);



});