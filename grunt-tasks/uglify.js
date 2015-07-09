/**
 * @author Bilal Cinarli
 */

module.exports = {
    options: {
        banner   : '/*! <%= package.name %> \n' +
                   ' *  <%= package.description %> \n' +
                   ' *  @author <%= package.author %> \n' +
                   ' *  @version <%= package.version %> \n' +
                   ' *  @build <%= grunt.template.today("dd-mm-yyyy") %> \n' +
                   ' */\n',
        sourceMap: true
    },
    dist   : {
        files: {
            'assets/scripts/<%= package.name %>.min.js': ['<%= concat.dist.dest %>']
        }
    }
};