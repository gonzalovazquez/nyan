var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var open = require('open');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

var testFiles = [
	'src/scripts/*.js',
	'test/unit/*spec.js'
	], 
	dest = 'src',
	serverAddress = 'localhost:',
	port = 80,
	imageFiles = ['scr/image.png'];

// Lint JS
gulp.task("lint", function() {
		gulp.src("./src/scripts/*.js")
				.pipe(jshint())
				.pipe(jshint.reporter("default"));
});

// Concat & Minify JS
gulp.task('minify-js', function(){
	return gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// Concat & Minify JS
gulp.task('minify-css', function() {
	gulp.src('src/styles/*.css')
		.pipe(concat('style.min.css'))
		.pipe(minifyCSS(opts))
		.pipe(gulp.dest('dist'))
});

//Minify Images
gulp.task('minify-img', function () {
		gulp.src(imageFiles)
				.pipe(imagemin())
				.pipe(gulp.dest('dist'));
});

//Test
gulp.task('test', function() {
	// Be sure to return the stream
	return gulp.src(testFiles)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function(err) {
			// Make sure failed tests cause gulp to exit non-zero
			throw err;
		});
});

//Watch
/*
Change sublime livereload default port to : 35750
*/
gulp.task('watch', ['server','launch'], function() {
	var server = livereload();
	gulp.watch(dest + '/**', ['lint']).on('change', function(file) {
			server.changed(file.path);
	});
});

gulp.task('server', function(next) {
	var connect = require('connect'),
			server = connect();
	server.use(connect.static(dest)).listen(process.env.PORT || 80, next);
});

gulp.task('launch', function(){
	open('http://' + serverAddress + port);
});

// Default
gulp.task('default', ['watch']);

//Build
gulp.task('ship', ['lint', 'test', 'minify-js', 'minify-css', 'minify-img']);