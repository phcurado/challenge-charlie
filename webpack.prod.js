const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
});
