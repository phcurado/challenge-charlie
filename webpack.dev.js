const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 2048000,
        maxAssetSize: 2048000,
    },
    devtool: 'source-map',
    devServer: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT,
        open: true,
        historyApiFallback: true,
    },
});
