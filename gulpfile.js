const { src, dest, watch, series, parallel } = require("gulp");
const postcss = require("gulp-postcss");
const cssmin = require("gulp-cssmin");
const concat = require("gulp-concat");
const magician = require("postcss-font-magician");
const rfs = require("rfs/postcss");
const browsersync = require("browser-sync").create();
const exec = require("child_process").exec;

// Task to minify css using package cssmin
function cssTasks() {
  // Folder with files to minify
  return (
    src("./css/*.css")
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
      .pipe(dest("./static/css")) // with pelican
    // .pipe(dest("./output/theme/css"))
  );
}

// browsersyncServe Task
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "./output",
    },
  });
  cb();
}

// browsersyncReload Task
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch(["./css/*.css"], series(build, browsersyncReload));
}

const cleanOutput = () => exec("if exist output rd output /s /q");
// const cleanCSS = () => exec("if exist static rd static /s /q"); //with pelican
const cleanCSS = () =>
  exec("if exist output/theme cd output && rd theme /s /q");
const buildContent = () => exec("pelican content");

// with pelican
// build files
//  const build = series(cleanOutput, cleanCSS, cssTasks, buildContent);

// Default Gulp Task
// exports.default = series(build, parallel(browsersyncServe, watchTask));

// build files
const build = series(cleanCSS, cssTasks);

// Default Gulp Task
exports.default = series(build, parallel(browsersyncServe, watchTask));
