
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');


// Task to minify css using package cssmin
gulp.task('default', function() {
    // Folder with files to minify
    return gulp.src('./css/*.css')
        //The method pipe() allow you to chain multiple tasks together 
        //It executes the task to minify the files
        .pipe(cssmin())
        //It concates all css files into one file
        .pipe(concat('main.css'))
        //It defines the destination of the minified files with the method dest
        .pipe(gulp.dest('./static/css'));
});
