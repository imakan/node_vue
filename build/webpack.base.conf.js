var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: {
        app: './src/main.js',
        style:'./static/js/style.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[id].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname,'../src'),
            'assets': path.join(__dirname,'../src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
	            loader: 'babel-loader',
	            exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: './static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('./static/css/[name].css'),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static/UE'),
                to: "../dist/static/UE",
                ignore: ['.*']
            }
        ])
    ]
}
