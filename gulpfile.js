// Gulp and its modules.
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// Non-Gulp modules.
var del = require('del');

// Cleans out the folder that will receive the generated files.
gulp.task('clean', function() {
    return del(['dist']);
});

var coreFiles = [
  "./lib/*.js",
  "./core/selector.js","./core/universal.js","./core/data.js", // these need to run in this order
  "./languages/*.js","./countries/*.js",
  "./core/core.js"
];

var backgroundFiles = [];
var optionsFiles = [];
coreFiles.forEach(function(item) {
  backgroundFiles.push(item);
  optionsFiles.push(item);
});
backgroundFiles.push("./background/*.js");
optionsFiles.push("./options/*.js");

gulp.task('chrome-extension-background-script', function() {
  gulp.src(backgroundFiles)
    .pipe(concat('chrome-extension-background.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('chrome-extension-options-script', function() {
  gulp.src(optionsFiles)
    .pipe(concat('chrome-extension-options.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['clean'], function() {
    gulp.start('chrome-extension-background-script', 'chrome-extension-options-script');
});
