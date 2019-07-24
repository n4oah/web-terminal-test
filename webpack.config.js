const path = require('path')
const HTMLWebpackPlugin = require('html-Webpack-plugin')


module.exports = {
    entry: {
        main: ['./src/main.js']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|(dist)/,
                use: {
                    loader: 'babel-loader'
                },
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html'
        })
    ]
}