/**
 * @author Bilal Cinarli
 */

module.exports = {
    css: {
        files: 'source/scss/**/*.scss',
        tasks: ['sass']
    },
    template: {
        files: ['source/templates/**/*.hbs'],
        tasks: ['handlebars']
    },
    js: {
        files: ['<%= jshint.files %>', 'grunt-tasks'],
        tasks: ['jshint', 'concat', 'uglify']
    }
};