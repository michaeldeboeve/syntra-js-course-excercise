var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var browserSync     = require('browser-sync');





gulp.task('browser-sync', function(){
    browserSync({
      server: {
        baseDir: cfg.browsersync.server
      }
    });
});

gulp.task('css', function () {
  return gulp.src(cfg.styles.build + '/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});
