const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: 'index.html',
});

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },

    plugins: [htmlPlugin],
};