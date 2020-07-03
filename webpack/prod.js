// production config
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './src/index.tsx',
    plugins: [],
    
    // TODO: Enable uglify for prod
    // optimization: {
    //     minimizer: [new UglifyJsPlugin()],
    // },
});