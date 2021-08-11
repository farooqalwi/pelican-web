
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');


// Task to minify css using package cssmin
gulp.task('default', function() {
    // Folder with files to minify
    return gulp.src('./toOptimizeCSS/*.css')
        //The method pipe() allow you to chain multiple tasks together 
        //It executes the task to minify the files
        .pipe(cssmin())
        .pipe(concat('main.css'))
        //It defines the destination of the minified files with the method dest
        .pipe(gulp.dest('./optimizeedCSS'));
});

// gulp.task('concatCSS', function() {
//     return gulp.src('./optimizeedCSS/*.css')
//         .pipe(concat('main.css'))
//         .pipe(gulp.dest('./theme/static/css'));
// });


// gulp.task('default', ['minifyCSS', 'concatCSS'], function(){});