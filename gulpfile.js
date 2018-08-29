const gulp   = require('gulp'),
      less   = require('gulp-less'),
      minify = require('gulp-minify-css'),
      uglify = require('gulp-uglifyjs'),
      useref = require('gulp-useref'),
      gulpif = require('gulp-if'),
      sync   = require('browser-sync');

const app   = 'app/',
      build = 'build/';

const config = {
    html: app + 'index.html',
    less: app + 'less/*.less',
    js:   app + 'js/*.js'
};

gulp.task('default', ['server', 'less', 'js', 'html', 'useref', 'watch']);

gulp.task('html', function () {
  return gulp.src(config.html)
    .pipe(gulp.dest(build + 'html'))
    .pipe(sync.reload({stream:true}));
});

gulp.task('less', function () {
  return gulp.src(config.less)
    .pipe(less())
    .pipe(gulp.dest(build + 'css'))
    .pipe(sync.reload({stream:true}));
});

gulp.task('js', function () {
  return gulp.src(config.js)
    .pipe(gulp.dest(build + 'js'))
    .pipe(sync.reload({stream:true}));
});

gulp.task('useref', ['less', 'js', 'html'], function () {
  return gulp.src(build + 'html/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minify()))
    .pipe(gulp.dest(build))
    .pipe(sync.reload({stream:true}));
})

gulp.task('watch', function () {
    gulp.watch(config.html, ['html', 'useref']);
    gulp.watch(config.less, ['less', 'useref']);
    gulp.watch(config.js,   ['js',   'useref']);
});

//Server
gulp.task('server', function () {
  sync({
    server: {
      baseDir: build
    }
  });
});
