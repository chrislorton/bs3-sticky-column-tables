var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minifier');

gulp.task('default', ['watch']);

gulp.task('less', function () {
 return gulp.src('./src/less/style.less')
  .pipe(less())
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', function () {
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch('./src/js/**/*.js', ['compress']);
});

gulp.task('compress', function() {
    return gulp.src('src/js/*.js').pipe(minify({
        minify: false,
        collapseWhitespace: true,
        minifyJS: false,
    })).pipe(gulp.dest('dist/js')); 
});
