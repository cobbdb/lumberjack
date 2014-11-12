module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            global: {
                src: 'dist/lumberjack.min.js'
            },
            options: {
                specs: 'tests/*.spec.js',
                helpers: 'tests/*.helper.js'
            }
        }
    });
};
