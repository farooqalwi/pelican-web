  
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');

// Task to minify css using package cssmin
gulp.task('default', () => {
     // Folder with files to minify
     return gulp.src('./css/*.css')
     //The method pipe() allow you to chain multiple tasks together 
     //I execute the task to minify the files
    .pipe(cssmin())
    //I define the destination of the minified files with the method dest
    .pipe(gulp.dest('./themes/simple/static/css'));
});
