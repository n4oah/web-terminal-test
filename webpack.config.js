const path = require('path')
const HTMLWebpackPlugin = require('html-Webpack-plugin')


module.exports = {
    entry: {
        main: ['./src/main.ts']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|(dist)/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
				test: /\.tsx$/,
				use: ['ts-loader']
			}
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html'
        })
    ]
}