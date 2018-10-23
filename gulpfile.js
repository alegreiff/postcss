var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();
var postcssPresetEnv = require('postcss-preset-env');
var rucksack = require('rucksack-css');
var precss = require('precss');
var colorHwb = require('postcss-color-hwb');
var fuentes = require('postcss-font-magician');



gulp.task('browser-sync', ['css'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        https: false,
        open: false

    });
});

gulp.task('serve', ['css'], function(){
    gulp.watch("./css/**/*.css", ['css']);
});

gulp.task('css', function(){
    var plugin = [
        autoprefixer(),
        //cssnano(),
        precss(),
        rucksack(),
        fuentes(),
        colorHwb(),
        postcssPresetEnv({
            stage: 0,
            features: {
                'nesting-rules': true,
                'hwb-function': true
              }
        }),
        //cssnano(),

    ];
    return gulp.src('./css/main.css')
    .pipe(postcss(plugin))
    .pipe(gulp.dest('./dest/'))
    .pipe(browserSync.reload({stream: true}));;
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("./css/*.css", ['css']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'watch']);
