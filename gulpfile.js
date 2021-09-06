const { src, dest, watch, series, parallel } = require("gulp");
const postcss = require("gulp-postcss");
const cssmin = require("gulp-cssmin");
const concat = require("gulp-concat");
const magician = require("postcss-font-magician");
const rfs = require("rfs/postcss");
const browsersync = require("browser-sync").create();
const execSync = require("child_process").execSync;

// Task to minify css using package cssmin
function cssTasks() {
  // Folder with files to minify
  console.log("Inside cassTask");
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
      .pipe(dest("./static/css"))
  );
}

// browsersyncServe Task
function browsersyncServe(cb) {
  console.log("Inside browsersyncServe");
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

// browsersyncReload Task
function browsersyncReload(cb) {
  console.log("Inside reload");
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  console.log("Inside watchTask");
  watch("./output/*.html", browsersyncReload);
  watch(["./css/*.css"], series(cssTasks, browsersyncReload));
}

const cleanOutput = () => execSync("if exist output rd output /s /q");
const cleanStatic = () => execSync("if exist static rd static /s /q");
const buildContent = () => execSync("pelican content");

const build = series(cleanOutput, cleanStatic, cssTasks, buildContent);

// Default Gulp Task
exports.default = series(build, parallel(browsersyncServe, watchTask));
