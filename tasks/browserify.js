module.exports = function (grunt) {
    grunt.config.merge({
        browserify: {
            global: {
                files: {
                    'bin/lumberjack.js': 'src/lumberjack.js'
                },
                options: {
                    browserifyOptions: {
                        standalone: 'Lumberjack'
                    }
                }
            }
        }
    });
};
