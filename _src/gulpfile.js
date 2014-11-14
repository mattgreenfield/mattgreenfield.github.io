var gulp = require('gulp');

// Styles
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');

// Images
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var paths = {
  scripts: [''],
  images: ['../imgs/*','../imgs/work/*',],
  styles: ['*.scss', 'sass_imports/*.scss']
};




gulp.task('sass', function () {
    gulp.src(paths.styles)
        .pipe(sass({style: 'compressed'}))
        .pipe(prefix(["last 1 version", "> 1%", "ie 8", "ie 7"],{map: false }))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../'));
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch((paths.styles), ['sass']);
});

gulp.task('default', ['watch']);

