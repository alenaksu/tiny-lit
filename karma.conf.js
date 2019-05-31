module.exports = function (config) {
    config.set({
        baseDir: '.',
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            '/src/**/*.ts',
            '/__test__/**/*.ts'
        ].map(path => process.cwd() + '/' + path),
        preprocessors: {
            '**/*.ts': 'karma-typescript',
            '**/src/**/*.ts': 'coverage',
        },
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.karma.json"
        },
        reporters: ['progress', 'karma-typescript', 'coverage'],
        port: 9876, // karma web server port
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: true,
        singleRun: false, // Karma captures browsers, runs the tests and exits
        concurrency: Infinity,
        coverageReporter: {
            reporters: [
                {
                    type: 'text',
                },
                { type: 'lcov', dir: 'coverage' },
            ],
        },
    });
};
