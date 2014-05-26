Nyan
===
<p align="center">
  <a href="http://gulpjs.com">
    <img height="194" width="320" src="http://img2.wikia.nocookie.net/__cb20120317044335/nine/images/thumb/d/dc/Nyancat.png/320px-Nyancat.png"/>
  </a>
</p>

A boilerplate for creating kickass web-apps.

## Install node

[Node](http://nodejs.org/)

## After installing node, install Gulp globally

	npm install gulp -g

## Install all the dependencies

	npm install


## `gulpfile.js`

This file is just a quick sample to give you a taste of what Nyan can do.

```javascript

// Concat & Minify JS
gulp.task('minify-js', function(){
	return gulp.src(paths.scripts.src)
		.pipe(concat('all-'+ pkg.version + '.min.js'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.dest));
});

// SASS to CSS
gulp.task('sass', function () {
	return gulp.src(paths.styles.src)
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
	.pipe(minifyCSS())
	.pipe(gulp.dest(paths.styles.dest))
});

// Minify Images
gulp.task('minify-img', function () {
	gulp.src(paths.images.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest));
});

// Build HTML files
gulp.task('build-html', function() {
	gulp.src([paths.scripts.dest + '/*.js', paths.styles.dest + '/*.css'], {read: false})
		.pipe(inject(paths.public.index, {ignorePath: paths.public.dest}))
		.pipe(gulp.dest(paths.public.dest))
});

// Lint JS
gulp.task("lint", function() {
	gulp.src([paths.scripts.src, '!'+ paths.scripts.vendor])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

// Test
gulp.task('test-watch', function() {
	return gulp.src(paths.test.src)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}))
		.on('error', function(err) {
			throw err;
		});
});

// Watches changes
gulp.task('watch', ['build','server','launch'], function() {
	var server = livereload();
	gulp.watch(paths.public.src + '/**', ['lint']).on('change', function(file) {
			server.changed(file.path);
	});
	gulp.watch([paths.public.index], ['build-html']);
	gulp.watch([paths.scripts.src], ['minify-js']);
	gulp.watch([paths.styles.src], ['sass']);
});

// Builds
gulp.task('build', function(callback) {
	sequence(
		'clean',
		['minify-js','sass'],
		'build-html',
		callback);
});

// Clean build folder
gulp.task('clean', function () {
	return gulp.src(paths.public.dest, {read: false})
		.pipe(clean());
});

```

###Folder structure

```
src/
├── images/
│ 
├── scripts/
│   ├── app.js
│   └── vendor/
│       └─google-analytics.js
├── styles/
│   └── main.scss
│
├── index.html
│
└── test/
    └── unit/
        └── app.spec.js

```

After running ``` gulp build ``` public folder is created and Nyan injects
all the scripts and styles into the new index.html

```
public/
├── images/
│ 
├── javascript/
│   └── all.[version-number].min.js
│ 
├── css/
│   └── main.[version-number].min.css
│
└── index.html
```

You can find more information about Nyan on my [blog post](http://blog.gonzalovazquez.ca/setting-up-your-automated-workflow-using-gulp/)

##TODO:

* Add github tasks