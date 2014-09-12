/****************************
*******Public Directory******
****************************/

exports.publicDir = 'public';

exports.publicScripts = 'public/javascript';

exports.publicStyles = 'public/css';

exports.publicImage = 'public/images';

/****************************
*******Source Directory******
****************************/

exports.index = 'src/index.html';

exports.source = 'src';

exports.scripts = 'src/scripts/**/*.js';

exports.vendor = 'src/scripts/vendor/*js';

exports.libs = [
	'bower_components/**'
];

exports.styles = [
	'src/styles/*.scss',
	'src/styles/*.css',
	'src/styles/*.sass'
];

exports.images = [
	'src/images/*.png'
];

exports.views = [
	'src/views/**'
];

exports.templates = [
	'src/templates/*.html'
];

/****************************
*******Test Directory******
****************************/

var testFiles = [
	'test/unit/*spec.js',
	'test/unit/**/*spec.js'
];

exports.test = exports.libs.concat(exports.libs, exports.scripts, testFiles);
