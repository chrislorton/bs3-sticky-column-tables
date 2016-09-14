var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var autoprefixerOptions = {
  browsers: ['last 6 versions']
};

gulp.task('default', ['watch']);

gulp.task('less', function () {
 return gulp.src('./src/less/style.less')
  .pipe(less())
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', function () {
    gulp.watch('./src/less/**/*.less', ['less']);
});
