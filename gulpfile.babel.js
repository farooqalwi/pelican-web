const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssmin = require("gulp-cssmin");
const concat = require("gulp-concat");
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
      //magician generates all @font-face rules. We never have to write a @font-face rule again.
      .pipe(postcss([magician()]))
      //RFS is a unit resizing engine which was initially developed to resize font sizes
      .pipe(postcss([rfs()]))
      //It concates all css files into one file
      .pipe(concat("main.css"))
      //It defines the destination of the minified files with the method dest
      .pipe(gulp.dest("./static/css"))
  );
});
