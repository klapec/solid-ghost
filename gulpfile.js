var gulp          = require('gulp');
var gutil         = require('gulp-util');
var jshintStylish = require('jshint-stylish');
var $             = require('gulp-load-plugins')();

var basePath = {
  src   : 'assets/src/',
  dest  : 'assets/public/'
};

var srcAssets = {
  styles        : basePath.src + 'stylesheets/',
  scripts       : basePath.src + 'scripts/*.js',
  vendorScripts : basePath.src + 'scripts/vendor/**/*.js',
  images        : basePath.src + 'images/*'
};

var destAssets = {
  styles        : basePath.dest + 'stylesheets/',
  scripts       : basePath.dest + 'scripts/',
  vendorScripts : basePath.dest + 'scripts/',
  images        : basePath.dest + 'images/'
};

function errorAlert(err) {
  $.notify.onError({
    title: "Gulp Error",
    message: "Check your terminal",
    sound: "Basso"
  })(err);
  gutil.log(gutil.colors.red(err.toString()));
  this.emit("end");
}

gulp.task('default', ['styles', 'scripts', 'vendorScripts', 'images'], function() {
  gulp.watch(srcAssets.styles + '**/*', ['styles']);
  gulp.watch(srcAssets.scripts, ['scripts']);
  gulp.watch(srcAssets.vendorScripts, ['vendorScripts']);
  gulp.watch(srcAssets.images, ['images']);
});

gulp.task('styles', function() {
  return gulp.src(srcAssets.styles + 'main.scss')
    .pipe($.plumber({errorHandler: errorAlert}))
    .pipe($.sass({
      precision: 6
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe($.minifyCss())
    .pipe($.rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(destAssets.styles))
    .pipe($.notify({
        title: "Stylesheets recompiled",
        message: "<%= file.relative %>",
        sound: "Glass"
    }));
});

gulp.task('scripts', function() {
  return gulp.src(srcAssets.scripts)
    .pipe($.plumber({errorHandler: errorAlert}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(destAssets.scripts))
    .pipe($.notify({
        title: "Scripts recompiled",
        message: "<%= file.relative %>",
        sound: "Glass"
    }));
});

gulp.task('vendorScripts', function() {
  return gulp.src(srcAssets.vendorScripts)
    .pipe($.plumber({errorHandler: errorAlert}))
    .pipe($.concat('vendor.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(destAssets.vendorScripts))
    .pipe($.notify({
        title: "Vendor scripts recompiled",
        message: "<%= file.relative %>",
        sound: "Glass"
    }));
});

gulp.task('images', function() {
  return gulp.src(srcAssets.images + '**/*')
    .pipe($.plumber({errorHandler: errorAlert}))
    .pipe($.changed(destAssets.images))
    .pipe($.imagemin({
      optimizationLevel: 1,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(destAssets.images))
    .pipe($.notify({
        title: "Images optimized",
        message: "<%= file.relative %>",
        sound: "Glass"
    }));
});
