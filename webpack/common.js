// shared config (dev and prod)
const { resolve } = require('path');
var nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web', 
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
        filename: 'js/bundle.[hash].min.js',
        path: resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {  
                test: /\.jsx?$/,
                use: ["babel-loader"],
            },
            {
                test: /\.tsx?$/,
                use: ["awesome-typescript-loader"]
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
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve(__dirname, '../public', 'index.html'),
            // favicon: resolve(__dirname, '../public', 'favicon.ico'),
            manifest: resolve(__dirname, '../public', 'manifest.json'),
            // // robots: resolve(__dirname, '../public', 'robots.txt'),
            // // logo192: resolve(__dirname, '../public', 'logo192.png'),
            // // logo512: resolve(__dirname, '../public', 'logo192.png')
        }),
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
            PUBLIC_URL: ''
        }),
        new CopyPlugin({
            patterns: [
                // relative path is from src
                { from: resolve(__dirname, '../public/favicon.ico'), to: resolve(__dirname, '../dist') },
                { from: resolve(__dirname, '../public/manifest.json'), to: resolve(__dirname, '../dist') },
                { from: resolve(__dirname, '../public/robots.txt'), to: resolve(__dirname, '../dist') },
                { from: resolve(__dirname, '../public/logo192.png'), to: resolve(__dirname, '../dist') },
                { from: resolve(__dirname, '../public/logo192.png'), to: resolve(__dirname, '../dist') }
            ]
        })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    performance: {
        hints: false,
    },
};