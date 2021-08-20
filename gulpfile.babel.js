const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssmin = require("gulp-cssmin");
const concat = require("gulp-concat");
const postcssPresetEnv = require("postcss-preset-env");
const magician = require("postcss-font-magician");
const rfs = require("rfs/postcss");

// Task to minify css using package cssmin
gulp.task("default", function () {
  // Folder with files to minify
  return (
    gulp
      .src("./css/*.css")
      //The method pipe() allow you to chain multiple tasks together
      //It executes the task to minify the files
      .pipe(cssmin())
      //It converts the css that most browsers can undestand it
      .pipe(
        postcss([
          postcssPresetEnv({
            stage: 3,
            features: {
              "any-link-pseudo-class": true,
              "custom-selectors": true,
              "gray-function": true,
              "hexadecimal-alpha-notation": true,
              "nesting-rules": true,
              "place-properties": true,
              "system-ui-font-family": true,
            },
          }),
        ])
      )
      //Font Magician generates @font-face rules. Never write a @font-face rule again.
      .pipe(postcss([magician({})]))
      //RFS is a unit resizing engine which was initially developed to resize font sizes
      .pipe(postcss([rfs()]))
      //It concates all css files into one file
      .pipe(concat("main.css"))
      //It defines the destination of the minified files with the method dest
      .pipe(gulp.dest("./static/css"))
  );
});
