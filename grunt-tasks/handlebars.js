/**
 * @author Bilal Cinarli
 */

module.exports = {
    options: {
        namespace  : 'tcApp.Templates',
        processName: function(filePath) {
            return filePath.replace(/^source\/templates\//, '').replace(/\.hbs$/, '');
        }
    },
    all    : {
        files: {
            "source/scripts/app/templates/_templates.js": ["source/templates/**/*.hbs"]
        }
    }
};
