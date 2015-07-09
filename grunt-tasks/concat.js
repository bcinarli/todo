/**
 * @author Bilal Cinarli
 */

module.exports = {
    dist: {
        src : [
            'bower_components/underscore/underscore-min.js',
            'bower_components/backbone/backbone-min.js',
            'bower_components/Backbone.localStorage/backbone.localStorage-min.js',
            'bower_components/handlebars/handlebars.runtime.min.js',

            'source/scripts/app/_helpers.js',
            'source/scripts/app/templates/_templates.js',

            'source/scripts/app/model/_call.js',
            'source/scripts/app/collections/_calls.js',

            'source/scripts/app/view/_calls-view.js',
            'source/scripts/app/view/_app-view.js',

            'source/scripts/app/router/_router.js',

            'source/scripts/_app.js'
        ],
        dest: 'assets/scripts/<%= package.name %>.js'
    }
};