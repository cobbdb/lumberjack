module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            build: {
                files: {
                    'dist/lumberjack.min.js': 'bin/lumberjack.js'
                }
            }
        }
    });
};
