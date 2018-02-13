const webpack = require('webpack')
const base = require('./webpack.config')

var config = Object.assign({}, base)

config.output.filename = 'vue-cascade-slider.min.js'

config.plugins = (config.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        sourceMap: false
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
])

module.exports = config