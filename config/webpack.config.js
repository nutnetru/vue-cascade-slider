const path = require('path');
const webpack = require('webpack');
const projectRoot = path.resolve(__dirname, '../');

module.exports = {
    entry: './src/slider.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'vue-cascade-slider.js',
        library: 'Slider',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/,
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    }
};