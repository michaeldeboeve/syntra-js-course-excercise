// include config
var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));

var gulp            = require('gulp');
var watch           = require('gulp-watch');
var requireDir      = require('require-dir');
var browserSync     = require('browser-sync');

requireDir('./gulp-tasks');



// Dev gulp task
gulp.task('serve', ['default'], function(){});
gulp.task('dev', ['default'], function(){});

gulp.task('default', cfg.tasks.default.map(String), function(){});

// Build gulp task
gulp.task('build', cfg.tasks.build.map(String), function(){});

// Main gulp task
gulp.task('main', cfg.tasks.main.map(String));


// Watch gulp task
gulp.task('watch', function(){
  // watch for JS changes, then reload
  gulp.watch(cfg.scripts.src, ['scripts']).on('change', browserSync.reload);

  // watch for image changes
  gulp.watch(cfg.images.src, ['images']);

  // watch for SASS changes
  gulp.watch(cfg.styles.src_files, ['styles']);
  // Watch for css changes, then inject css
  gulp.watch(cfg.styles.build + '**/*.css',  ['css']);
  // Watch for html changes, then reload page
  gulp.watch(cfg.html.build + '**/*.html').on('change', browserSync.reload);
  // watch for Pug changes, then reload
  gulp.watch(cfg.pug.watch, ['html']).on('change', browserSync.reload);
});
