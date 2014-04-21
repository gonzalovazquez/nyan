module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    files:[
    	'smoking-carrots/src/js/*.js',
    	'smoking-carrots/test/unit/*.spec.js'
    ],
    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 6000,
    singleRun: true
  });
};