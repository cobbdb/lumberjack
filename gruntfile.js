module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            build: {
                files: {
                    'dist/lumberjack.min.js': 'src/lumberjack.js'
                }
            }
        },
        exec: {
            docs: {
                cmd: 'docker -i src -o docs-clone'
            }
        },
        jasmine: {
            options: {
                specs: 'tests/*.spec.js'
            },
            raw: {
                src: 'src/lumberjack.js'
            },
            dist: {
                src: 'dist/lumberjack.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', [
        'uglify',
        'jasmine:dist'
    ]);
    grunt.registerTask('build', [
        'default',
        'exec:docs'
    ]);
};
