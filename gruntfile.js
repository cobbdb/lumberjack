module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            build: {
                files: {
                    'dist/lumberjack.min.js': 'src/lumberjack.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
