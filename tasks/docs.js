module.exports = function (grunt) {
    grunt.config.merge({
        'docker-clone': {
            build: {
                dir: 'src',
                branch: 'gh-pages',
                index: 'lumberjack.js.html'
            }
        }
    });
};
