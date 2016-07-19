var gulp = require('gulp'),
 sourcemaps = require('gulp-sourcemaps'),
 sass = require('gulp-sass'),
 autoprefixer = require('gulp-autoprefixer'),
 sassLint = require('gulp-sass-lint'),
 cleanCSS = require('gulp-clean-css'),
 bourbon = require("bourbon").includePaths,
 neat = require("bourbon-neat").includePaths;
var paths = bourbon.concat(neat);

gulp.task('sass', function(done) {
  gulp.src('./core/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: paths
  }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(cleanCSS({compatibility: 'ie9'}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./core'));
  done();
});

gulp.task('sass-lint', function () {
  return gulp.src('./core/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('watch', function() {
  gulp.watch('./core/**/*.s+(a|c)ss').on('change', gulp.parallel('sass-lint', 'sass'));
})

gulp.task('default', gulp.series('sass-lint', 'sass', 'watch'));
gulp.task('build', gulp.series('sass-lint', 'sass'));
