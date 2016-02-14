var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task('browserify', function(){
  browserify('./js/main.js',{debug: true})
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .on('error', function(err){console.log('Error:' + err.message);})
    .pipe(source('main.js'))
    .pipe(gulp.dest('../assets/js/'));
});

gulp.watch(
  './js/**/**', ['browserify']
);

gulp.task('default',['browserify']);