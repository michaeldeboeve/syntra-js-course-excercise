var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require('gulp-notify');
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');
var sass            = require('gulp-sass');
var sassGlob        = require('gulp-sass-glob');


var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


var postcssConfigDev = [
  autoprefixer({browsers: cfg.browsers}),
];

var postcssConfigBuild = [ 
  autoprefixer({browsers: cfg.browsers}),
];


// Styles Dev
gulp.task('styles', function(){
  gulp.src(cfg.styles.src)
    .pipe(sassGlob())
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(postcssConfigDev))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cfg.styles.build));
});

// Styles Build
gulp.task('styles-build', function(){
  gulp.src(cfg.styles.src)
    .pipe(sassGlob())
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss(postcssConfigBuild))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cfg.styles.build));
});
