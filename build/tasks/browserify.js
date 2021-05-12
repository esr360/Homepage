/**
 * Individual browserify tasks
 * @see https://github.com/jmreidy/grunt-browserify
 */
module.exports = function(config) {
    return {
        options: {
            transform: [['babelify', {global: true, presets: ['babel-preset-env', 'babel-preset-es2015']}]]
        },
        dist: {
            src: config.project.source[1].theme + '<%=theme%>.js',
            dest: config.project.dist[1].theme + config.dist + '.js'
        }
    }
}