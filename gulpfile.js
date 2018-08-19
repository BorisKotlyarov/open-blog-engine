const fs                          = require('fs');
const gulp                        = require('gulp');
const cssnano                     = require('gulp-cssnano');
const babel                       = require('gulp-babel');
const sass                        = require('gulp-sass');
const uglify                      = require('gulp-uglify');
const sourcemaps                  = require('gulp-sourcemaps');
const replace                     = require('gulp-replace');
const concat                      = require('gulp-concat');
const clean                       = require('gulp-clean');
const path                        = require('path');


let distDir                       = './frontend/dist';
let srcDir                        = './frontend/src';
let scssDir                       = './frontend/src/scss';
let jsSource                      = './frontend/src/scripts';
let resourceDir                   = './frontend/resources';

gulp.task('imagesSymlink', function () {

    let linkedObj = {
        path: path.resolve(`${resourceDir}/img/`),
        link: path.resolve(`${distDir}/img/`),
    };

    if(fs.existsSync(linkedObj.path) && !fs.existsSync(`${distDir}/img`)) {
        fs.symlinkSync(linkedObj.path, linkedObj.link, 'dir');
    }
});

gulp.task('clean', function () {
    return gulp.src(distDir, {read: false})
        .pipe(clean());
});

gulp.task('cleanAppJS', function () {
    return gulp.src('./dist/js/app.js', {read: false})
        .pipe(clean());
});

gulp.task('copy', function () {
    gulp.src([`${resourceDir}/**/*`])
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    gulp.src([`${jsSource}/**/*.js`])
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('interface.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${distDir}/js`));
});

gulp.task('html', function() {
    gulp.src([`${srcDir}/markup/**/*.html`])
        .pipe(gulp.dest(distDir));
});

gulp.task('scss', function() {
    gulp.src([`${scssDir}/main.scss`])
        .pipe(sourcemaps.init())
        .pipe(sass({ precision: 10 }).on('error', sass.logError))
        .pipe(cssnano({ zindex: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${distDir}/style`))
});

gulp.task('html-scss-js', () => {
    gulp.start('html', 'js', 'scss');
});

gulp.task('build', ['clean'], () => {
    gulp.start('imagesSymlink', 'html', 'js', 'scss');
});

gulp.task('watch', ['build'], () => {
    gulp.watch([`${srcDir}/resource/**/*`],         ['copy']);
    gulp.watch([`${srcDir}/html/**/*`],             ['html']);
    gulp.watch([`${scssDir}/**/*`],                 ['scss']);
    gulp.watch([`${jsSource}/interface/**/*`],      ['js']);
});

gulp.task('lite-watch', ['imagesSymlink', 'html', 'css', 'js'], () => {
    gulp.watch([`${srcDir}/html/**/*`],             ['html']);
    gulp.watch([`${scssDir}/**/*`],                 ['scss']);
    gulp.watch([`${jsSource}/interface/**/*`],      ['js']);
});
