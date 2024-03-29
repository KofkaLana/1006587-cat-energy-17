"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");

var imegmin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var minjs = require("gulp-uglify");

var del = require("del");

var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imegmin([
      imegmin.optipng({ optimizationLevel: 3 }),
      imegmin.jpegtran({ progressive: true }),
      imegmin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icons/*.svg")
      .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**/*",
    "!source/img/icons/**",
    "source/js/*.js",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
})

gulp.task("clean", function() {
  return del("build");
})

gulp.task("compress", function(){
  return gulp.src([
    "source/js/*.js",
    "!source/js/picturefill.min.js"])
  .pipe(minjs())
  .pipe(rename({
    suffix: ".min",
  }))
  .pipe(gulp.dest("build/js"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/img/icons/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("compress", "refresh"))
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done){
  server.reload();
  done();
})

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "compress",
  "sprite",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
