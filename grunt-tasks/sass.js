/**
 * @author Bilal Cinarli
 */

module.exports = {
    dist: {
        options: {
            style: 'compressed',
            sourcemap: 'none'
        },
        files  : {
            'assets/styles/styles.css': 'source/scss/styles.scss'
        }
    },
    dev : {
        options: {
            style    : 'nested'
        },
        files  : {
            'assets/styles/styles.dev.css': 'source/scss/styles.scss'
        }
    }
};