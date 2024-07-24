const gulp       = require('gulp');
const postcss    = require('gulp-postcss');
const sass       = require('gulp-sass')(require('sass'));
const minify     = require('gulp-minify');
var autoprefixer = require('autoprefixer');
const cssnano    = require('cssnano');
const { series } = require('gulp');

// Dev build of files watching scss, js and php for translations. 
function watch() {
  gulp.watch('./src/scss/**/*.scss', style);
//   gulp.watch('./src/js/**/*.js', js);
}

// Compile Minified css. 
function style() {
  var plugins = [
    cssnano(),
    autoprefixer(),
  ];

  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./src/css'))
}

// Compile Minified JS. 
// function js() {
//   return gulp.src('./src/js/**/*.js')
//     .pipe(
//       minify(
//         {
//           noSource: true,
//           ext: {
//             min: '.js'
//           }
//         }
//       )
//     )
//     .pipe(gulp.dest('./dist/js'));
// }

exports.style = style;
exports.watch = watch;
// exports.js    = js;
exports.build = series( style );