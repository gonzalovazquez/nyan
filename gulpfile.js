var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var files = require('./config/files');
var open = require('open');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var colors = require('colors');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var inject = require("gulp-inject");
var clean = require('gulp-clean');
var sequence = require('run-sequence');
var stylish = require('jshint-stylish');
var pkg = require('./package.json');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;

var serverAddress = 'localhost:', port = 8090;

// Concat & Minify JS
gulp.task('minify-js', function(){
	return gulp.src([files.vendor, files.scripts])
		.pipe(concat('all-'+ pkg.version + '.min.js'))
		.pipe(gulp.dest(files.publicScripts))
		.pipe(gulpif(argv.production, uglify()))
		.pipe(gulp.dest(files.publicScripts));
});

// SASS to CSS
gulp.task('sass', function () {
	return gulp.src(files.styles)
	.pipe(sass({
			onError: function (error) {
			gutil.log(gutil.colors.red(error));
			gutil.beep();
		},
		onSuccess: function () {
			gutil.log(gutil.colors.green('Sass styles compiled successfully.'));
		}
	}))
	.pipe(concat('main-' + pkg.version + '.min.css'))
	.pipe(gulpif(argv.production, minifyCSS()))
	.pipe(gulp.dest(files.publicStyles))
});

//Minify Images
gulp.task('minify-img', function () {
	gulp.src(files.images)
		.pipe(imagemin())
		.pipe(gulp.dest(files.publicImage));
});

// Build HTML files
gulp.task('build-html', function() {
	gulp.src([files.publicScripts + '/*.js', files.publicStyles + '/*.css'], {read: false})
		.pipe(inject(files.index, {ignorePath: files.publicDir}))
		.pipe(gulp.dest(files.publicDir))
});

// Lint JS
gulp.task("lint", function() {
	gulp.src([files.scripts, '!'+ files.vendor])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

//Test
gulp.task('test', function() {
	return gulp.src(files.test)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function(err) {
			throw err;
		});
});

gulp.task('test-watch', function() {
	return gulp.src(files.test)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}))
		.on('error', function(err) {
			throw err;
		});
});

/* 
 * Watch
 * Open Sublime before running this task
*/
gulp.task('watch', ['build','server','launch'], function() {
	var server = livereload();
	gulp.watch(files.source + '/**', ['lint']).on('change', function(file) {
			server.changed(file.path);
	});
	gulp.watch([files.index], ['build-html']);
	gulp.watch([files.scripts], ['minify-js']);
	gulp.watch([files.styles], ['sass']);
});

gulp.task('server', function(next) {
	var connect = require('connect'),
		server = connect();
	server.use(connect.static(files.publicDir)).listen(port, next);
});

gulp.task('launch', function(){
	open('http://' + serverAddress + port);
});

//Move bower_components to public
gulp.task('bower_components', function(){
	gulp.src(files.libs, { base: './' })
		.pipe(gulp.dest(files.publicDir));
});

//Move views to public folder
gulp.task('views', function(){
	return gulp.src(files.views)
		.pipe(gulp.dest('public/views'));
});

//Move templates to public folder
gulp.task('templates', function(){
	return gulp.src(files.templates)
		.pipe(gulp.dest('public/templates'));
});

//Build
gulp.task('build', function(callback) {
	sequence(
		'clean',
		['minify-js','sass'],
		'build-html',
		'bower_components',
		'views',
		'templates',
		callback);
});

// Clean build folder
gulp.task('clean', function () {
	return gulp.src(files.publicDir, {read: false})
		.pipe(clean());
});

// Default
gulp.task('default', ['build']);