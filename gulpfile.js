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

gulp.task('server', function() {

  var files = [];
  Array.prototype.push.apply(files,coreFiles);
  files.push("./server/server.js");

  gulp.src(files)
    .pipe(concat('server.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('chrome-extension-background-script', function() {

  var files = ["./chrome/context.js"];
  Array.prototype.push.apply(files,coreFiles);
  files.push("./chrome/background.js");

  gulp.src(files)
    .pipe(concat('background-complete.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./chrome/'));
});

gulp.task('chrome-extension-options-script', function() {

  var files = ["./chrome/context.js"];
  Array.prototype.push.apply(files,coreFiles);
  files.push("./chrome/background.js");
  files.push("./chrome/options.js");

  gulp.src(files)
    .pipe(concat('options-complete.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./chrome/'));

  gulp.src(['./lib/bootstrap/css/bootstrap.min.css','./lib/bootstrap/css/bootstrap-theme.min.css'])
    .pipe(concat('options.css'))
    //.pipe(uglify())
    .pipe(gulp.dest('./chrome/'));

});

gulp.task('default', ['clean'], function() {
    gulp.start('chrome-extension-background-script','chrome-extension-options-script');
});
