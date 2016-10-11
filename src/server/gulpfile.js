var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var nib = require('nib');
var minify = require('gulp-minify-css');
var nodemon = require('nodemon');
var livereload = require('gulp-livereload');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var tap = require('gulp-tap');

var paths = {
    input: '../components/**/*',
    output: 'dist/',
    scripts: {
        input: 'src/js/*',
        output:'../../build/js'
    }
}
gulp.task('start', function() {
    nodemon({
        script: './server.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    });
});
gulp.task('server', function() {
    gulp.src('./build').pipe(webserver({
        host: '0.0.0.0',
        port: 8080,
        fallback: 'index.html',
        livereload: true
    }));
});
gulp.task(
    'sass',
    function() {
        return gulp.src('../components/scss/*.scss').pipe(sass.sync().on('error', sass.logError)).pipe(
            concat('all.css')
        ).pipe(gulp.dest('../../build/css'));
    }
);
gulp.task('sass:watch', function() {
    gulp.watch('../components/scss/*.scss', ['sass']);
});
gulp.task('build', function() {

    browserify({
        entries: '../components/index.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('../../build/js')).on('end', function() {
        livereload.reload()
      })
;
});
gulp.task('watch', function() {
  livereload.listen();
    gulp.watch('../components/**/*.jsx', ['build']).on('change', function(){
      console.log('reloading')
      livereload.listen();
    });
    gulp.watch(['../components/**/*.scss'], ['sass']);
});


gulp.task('default', ['start', 'watch']);
