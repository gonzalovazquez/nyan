module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    files:[
    	'/src/js/*.js',
    	'/test/unit/*.spec.js'
    ],
    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 6000,
    singleRun: true
  });
};