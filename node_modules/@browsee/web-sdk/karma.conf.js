module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      // add webpack as preprocessor
      'test/**/*.js': ['webpack']
    },
    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      stats: 'errors-only',
    },
    files: ['test/**/*.js'],
    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity
  })
}
