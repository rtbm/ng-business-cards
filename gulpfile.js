var gulp = require('gulp');
var print = require('gulp-print');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var data = require('gulp-data');
var del = require('del');
var gulpif = require('gulp-if');
var args = require('yargs').argv;
var merge = require('merge-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var ngConstant = require('gulp-ng-constant');
var angularTranslate = require('gulp-angular-translate');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssNano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran');
var templateCache = require('gulp-angular-templatecache');

var ENV_PRODUCTION = args.env === 'production';
var TARGET_DIR = './www';

gulp.task('clean', function () {
    return del(['www']);
});

gulp.task('build:scripts', function () {
    return browserify({
        entries: './src',
        debug: true
    })
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(vinylSourceStream('app.js'))
        .pipe(vinylBuffer())
        .pipe(ngAnnotate())
        .pipe(gulpif(ENV_PRODUCTION, uglify()))
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('build:strings', function () {
    return gulp.src('./src/modules/**/res/strings/*.json')
        .pipe(angularTranslate({
            module: 'ngApp.strings',
            standalone: true
        }))
        .pipe(gulpif(ENV_PRODUCTION, uglify()))
        .pipe(rename('strings.js'))
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('build:layouts', function () {
    return gulp.src('./src/modules/**/res/layout/*.html')
        .pipe(templateCache('layouts.js', {
            module: 'ngApp.layouts',
            standalone: true
        }))
        .pipe(gulpif(ENV_PRODUCTION, uglify()))
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('build:index', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('build:styles', function () {
    return gulp.src('./src/modules/**/res/styles/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulpif(ENV_PRODUCTION, cssNano({
            zindex: false
        })))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('build:config', function () {
    return gulp.src('./config/' + (ENV_PRODUCTION ? 'production' : 'development') + '.json')
        .pipe(ngConstant({
            name: 'ngApp.config'
        }))
        .pipe(rename('config.js'))
        .pipe(gulpif(ENV_PRODUCTION, uglify()))
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('build:copy', function () {
    var fonts = gulp.src([
            './bower_components/roboto-fontface/fonts/*.{eot,ijmap,ttf,woff,woff2,svg}',
            './bower_components/icomoon-bower/fonts/*.{eot,svg,ttf,woff}'
        ])
        .pipe(gulp.dest(TARGET_DIR + '/fonts'));

    var styles = gulp.src([
            './bower_components/roboto-fontface/css/roboto-fontface.css',
            './bower_components/icomoon-bower/style.css',
        ])
        .pipe(replace('url(\'../', 'url(\''))
        .pipe(concat('fonts.css'))
        .pipe(gulpif(ENV_PRODUCTION, cssNano()))
        .pipe(gulp.dest(TARGET_DIR));

    var scripts = gulp.src([
            './bower_components/angular/angular.js',
            './bower_components/angular-animate/angular-animate.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js',
            './bower_components/angular-sanitize/angular-sanitize.js',
            './bower_components/angular-translate/angular-translate.js',
            './bower_components/a0-angular-storage/dist/angular-storage.js',
            './bower_components/hammerjs/hammer.js',
            './bower_components/hammer-time/hammer-time.js',
            './bower_components/lawnchair/src/Lawnchair.js',
            './bower_components/lawnchair/src/adapters/dom.js'
        ])
        .pipe(gulpif(ENV_PRODUCTION, uglify()))
        .pipe(gulp.dest(TARGET_DIR + '/vendors'));

    return merge(fonts, styles, scripts);
});

gulp.task('build:images', function () {
    return gulp.src('./src/images/*.jpg')
        .pipe(gulpif(ENV_PRODUCTION, imagemin({
            progressive: true,
            use: [jpegtran()]
        })))
        .pipe(gulp.dest(TARGET_DIR + '/images'));
});

gulp.task('build', ['build:scripts', 'build:strings', 'build:layouts', 'build:index', 'build:styles', 'build:config',
    'build:copy', 'build:images']);

gulp.task('watch', function () {
    gulp.watch([
        './src/index.js',
        './src/modules/**/*.js',
        '!./src/modules/**/*-test.js'
    ], ['build:scripts']);
    gulp.watch('./src/modules/**/res/strings/*.json', ['build:strings']);
    gulp.watch('./src/modules/**/res/layout/*.html', ['build:layouts']);
    gulp.watch('./src/index.html', ['build:index']);
    gulp.watch('./src/modules/**/res/styles/*.less', ['build:styles']);
    gulp.watch('./src/config/*.json', ['build:config']);
});

gulp.task('default', ['build', 'watch']);
