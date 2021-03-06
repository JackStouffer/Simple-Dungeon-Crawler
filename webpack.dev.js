const { resolve } = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dev",
        compress: true
    },
    output: {
        filename: "game.js",
        path: resolve(__dirname, "dev")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ]
});
