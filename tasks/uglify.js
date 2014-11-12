module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            build: {
                files: {
                    'dist/global/lumberjack.min.js': 'bin/lumberjack.js'
                }
            }
        }
    });
};
