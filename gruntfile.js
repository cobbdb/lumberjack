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
                specs: 'tests/*.spec.js',
                helpers: 'tests/*.helper.js'
            },
            raw: {
                src: 'src/lumberjack.js'
            },
            dist: {
                src: 'dist/lumberjack.min.js'
            }
        }
    });

    // Load all grunt NPM tasks.
    require('matchdep').filterDev([
        'grunt-*',
        '!grunt-template-*'
    ]).forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'jasmine:raw',
        'uglify',
        'jasmine:dist'
    ]);
    grunt.registerTask('build', [
        'default',
        'exec:docs'
    ]);
};
