const { merge } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const common = require('./webpack.common.js');
const glob = require("glob");

module.exports = merge(common, {
    mode: 'development',
    entry: glob.sync(__dirname + "/tests/**/*.test.js"),
    output: {
        path: __dirname + "/test-dist/",
        filename: 'main.js'
    },
    devtool: "source-map",
    plugins: [
        new DefinePlugin({
            ENV: JSON.stringify("TEST")
        })
    ]
});