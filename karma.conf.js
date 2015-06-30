module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'chai-sinon'],
    browsers: ['PhantomJS'],
    files: ['node_modules/angular/angular.js', 
            'node_modules/angular-ui-router/build/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/main.js', 
            'tests/client/**/*.js'],
    reporters: ['mocha']
    
  });
};
