const path = require('path');
var OfflinePlugin = require('offline-plugin');

module.exports = {
    watch: true,
    entry: {
        cover: './webpack/home.js',
        post: './webpack/postPage.js'
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'js')
    },
    module: {
        rules: [{
            test: /.js$/,
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_components')
            ],
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }]
    },
    plugins: [
        new OfflinePlugin()
    ],
    resolve: {
        extensions: ['.json', '.js']
    }
};
