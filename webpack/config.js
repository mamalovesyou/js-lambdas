const { resolve } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        app: resolve(__dirname, '../src/index.tsx'),
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
        filename: 'js/bundle.[hash].min.js',
        path: resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico|json)$/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: resolve(__dirname, '../public', 'index.html')
        }),
        // new CopyWebPackPlugin({
        //     patterns: [
        //         // relative path is from src
        //         { from: resolve(__dirname, '../public/favicon.ico'), to: resolve(__dirname, '../dist') },
        //         { from: resolve(__dirname, '../public/manifest.json'), to: resolve(__dirname, '../dist') },
        //         { from: resolve(__dirname, '../public/robots.txt'), to: resolve(__dirname, '../dist') },
        //         { from: resolve(__dirname, '../public/logo192.png'), to: resolve(__dirname, '../dist') },
        //         { from: resolve(__dirname, '../public/logo192.png'), to: resolve(__dirname, '../dist') }
        //     ]
        // })
    ],
    devServer: {
        contentBase: [resolve(__dirname, '../public')]
    }
};