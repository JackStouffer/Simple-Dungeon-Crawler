const { resolve } = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "game.js",
        path: resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ]
});
