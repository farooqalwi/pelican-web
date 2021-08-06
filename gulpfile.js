const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');

exports.default = function() {
  return src('./themes/simple/static/**/*.css')
  .pipe(postcss())
    .pipe(dest('output/'));
}
